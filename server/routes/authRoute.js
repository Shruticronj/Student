const express = require('express');
const passport = require('passport');
const validator = require('validator');
const router = new express.Router();
const userDetailDb = require("../api/userDetail/userDetail.model")();
let models = require("../sqldb")();

/**
 * Validate the login form
 *
 * @param {object} payload - the HTTP body message
 * @returns {object} The result of validation. Object contains a boolean validation result,
 *                   errors tips, and a global message for the whole form.
 */
function validateLoginForm(payload) {
	const errors = {};
	let isFormValid = true;
	let message = '';

	if (!payload || typeof payload.username !== 'string' || payload.username.trim().length === 0) {
	    isFormValid = false;
	    errors.username = 'MissingUsernameError';
      message.username= 'Please provide username';
	  }

	if (!payload || typeof payload.password !== 'string' || payload.password.trim().length === 0) {
	    isFormValid = false;
	    errors.password = 'MissingPasswordError';
      message.password= 'Please provide password';
	}

	if (!isFormValid) {
	    message = 'Please provide both username and  the details to login!';
	}
	return {
	    success: isFormValid,
	    message,
	    errors
	};
}

router.post('/forgotPassword', (req, res) => {

	let email_id= req.body.email_id;
	let password= req.body.new_password;

	if(email_id && password){
	userDetailDb.findUserByEmail(models, email_id, password).then(output=>{
		// console.log("Output--->>>",output);
		let result_email = output.dataValues.email_id;
		let updated_pass = output.dataValues.password;
		let error = output.error;
		if (result) {
			res.status(200).json({ changedData: result_email, updatePass: updated_pass, flag: true, message: "Password changed successfully!!" });
		}
		else{
			res.status(500).json({ error: error, flag: false, message: "IS_INTERNAL_SERVER_ERROR" });
			}
	})
}
	else{
		console.log("Email_id or password not found!!");
	}
}),

router.post('/changePassword', (req, res) => {
	let username= req.body.username;
	let password= req.body.new_password;
	if(email_id && password){
	userDetailDb.findUserByUsername(models, username, password).then(output=>{
		let username = output.dataValues.username;
		let updated_pass = output.dataValues.password;
		let error = output.error;
		if (result) {
			res.status(200).json({ changedData: username, updatePass: updated_pass, flag: true, message: "Password changed successfully!!" });
		}
		else{
			res.status(500).json({ error: error, flag: false, message: "IS_INTERNAL_SERVER_ERROR" });
			}
	})
}
	else{
		console.log("Email_id or password not found!!");
	}
}),

router.post('/login', (req, res, next) => {
 	const validationResult = validateLoginForm(req.body);
  	if (!validationResult.success) {
    	return res.status(400).json({
	      isLogin: false,
	      message: validationResult.message,
	      errors: validationResult.errors
    	});
		}
		
			return passport.authenticate('local-login',(err, token, userData) => {
  		if(err){
  			if(err.name==='IncorrectCredentialsError'){
                console.log("Incorrect");
  				return res.status(400).json({
  					isLogin: false,
            errors: 'IncorrectCredentialsError',
         		message: err.message
  				});
  			}

  			return res.status(400).json({
  				isLogin: false,
        	message: 'Could not process the form.',
          errors: 'InternalServerError'
  			});
  		}

  		return res.json({
  			isLogin: true,
  			message: 'You have successfully logged in!',
  			token,
  			user: userData
  		});
  	})(req, res, next);
})

module.exports = router;
