'use strict';
const Sequelize = require('sequelize');
// const config = require('./../../config/config.default.js');


// const sequelize = new Sequelize('database', 'username', 'password', {
//   port: '3306',
//   host: 'localhost',
//   dialect: 'mysql' ,
//   sync: { force: true },
//   pool: {
//     max: 5,
//     idle: 30000,
//     acquire: 60000,
//   }
// });


// const Model = Sequelize.Model;
// class User extends Model {}
// User.init({
//   id:{
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   phone: {
//     type: Sequelize.STRING(11),
//     allowNull: false
//   },
//   code:{
//     type: Sequelize.STRING(4),
//     allowNull: false
//   }
// })




module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user',{
      id:{
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      phone: {
        type: Sequelize.STRING(11),
        allowNull: false
      },
      code:{
        type: Sequelize.STRING(4),
        allowNull: false
      }
    })
    /*
      Add altering commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkInsert('People', [{
        name: 'John Doe',
        isBetaMember: false
      }], {});
    */
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user')
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('People', null, {});
    */
  }
};
