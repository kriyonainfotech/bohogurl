const { Sequelize, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("./../config/db");

// the User model
const orderInfo = sequelize.define("OrderInfo", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  city: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  zipcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipppingAdd:{
    type:DataTypes.STRING
  },
  shipCity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipState: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  shipZipcode: {
    type: DataTypes.STRING,
    allowNull: false
  },
  orderTotal:{
    type:DataTypes.FLOAT,
    allowNull:true
  }
  
});

// Sync the model with the database
(async () => {
  await sequelize.sync();
  console.log("User table created (if it doesn't already exist).");
})();

module.exports = orderInfo;


// const { DataTypes } = require('sequelize');
// const sequelize = require('../config/db');  // your Sequelize instance

// const Order = sequelize.define('Order', {
//   id: {
//     type: DataTypes.INTEGER,
//     primaryKey: true,
//     autoIncrement: true
//   },
//   user_id: {
//     type: DataTypes.INTEGER,
//     allowNull: false
//   },
//   total_amount: {
//     type: DataTypes.DECIMAL(10, 2),
//     allowNull: false
//   },
//   status: {
//     type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
//     defaultValue: 'pending'
//   }
// }, {
//   timestamps: true,
// });

// module.exports = Order;

