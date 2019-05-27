let checkRole= require('./../config/roleCheck');
let express=require('express')
let router = express.Router();

let apiRouter = (app) => {
  // app.use('/api/forgotPassword', require('../api/forgotPassword'));
  app.use('/api/department',checkRole(['admin']), require('../api/department'));
  app.use('/api/curriculum',checkRole(['admin']), require('../api/curriculum'));  
  app.use('/api/student',checkRole(["admin"]),require('../api/student'));
  app.use('/api/teacher',checkRole(['admin']), require('../api/teacher'));  
  app.use('/api/subject',checkRole(['admin']), require('../api/subject'));  
  app.use('/api/event',checkRole(['admin']), require('../api/event'));  
  app.use('/api/course',checkRole(['teacher','admin']), require('../api/course'));
  app.get('/api/check', (req, res) => {
  let user ={};
  user.name= req.user.name;
  user.role= req.user.role;
  user.username= req.user.username;
  return res.json({
      isLogin: true,
      message: 'You are already logged in',
      token : req.headers.authorization.split(' ')[1],
      user: user
    });
  })
};

module.exports = apiRouter


