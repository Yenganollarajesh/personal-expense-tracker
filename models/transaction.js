const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Transaction = sequelize.define('Transaction', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,  
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false, 
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,  
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,  
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true, 
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
});

module.exports = Transaction;
