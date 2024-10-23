// config/database.js
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './expense-tracker.sqlite',  // Location of SQLite DB
});

module.exports = sequelize;
