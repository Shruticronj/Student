var express=require('express');
var router= express.Router();
var controller= require('./fp.controller');
 
router.post('/forgotPassword', controller.getUser);
 
module.exports = router ;