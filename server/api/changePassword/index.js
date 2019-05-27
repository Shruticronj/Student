var express=require('express');
var router= express.Router();
var controller= require('./userDetail.controller');
 
router.post('/changePassword', controller.getUser);
 
module.exports = router ;