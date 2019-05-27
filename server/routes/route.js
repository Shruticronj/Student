let checkRole= require('./../config/roleCheck');
let path= require('path');

module.exports = (app) => {
    const authRoutes = require('./authRoute');
    require('./apiRoute')(app);
    app.use('/auth', authRoutes);
};


//   /auth/forgotPassword

