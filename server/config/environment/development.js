'use strict';
// Development specific configuration
// ==================================
module.exports = {
  // Sequelize connection opions
  sequelize: {
    uri: 'postgres://postgres:cronj@localhost:5432/localsms',
    options: {
      logging: false,
      dialect: 'postgres',
      //storage: 'dev.sqlite',
      define: {
        timestamps: true,
        underscored: true,
         freezeTableName: true,
      }
    }
  },

};