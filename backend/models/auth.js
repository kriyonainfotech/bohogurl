// const { Sequelize, DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");
// const sequelize = require("./../config/db");

// // the User model
// const User = sequelize.define("user", {
//   name: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   email: {
//     type: DataTypes.STRING,
//     allowNull: false,
//     unique: true, // Ensure email is unique
//   },
//   phone: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   password: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   address: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
//   pincode: {
//     type: DataTypes.STRING,
//     allowNull: false,
//   },
  
// });

// // Sync the model with the database
// (async () => {
//   await sequelize.sync();
//   console.log("User table created (if it doesn't already exist).");
// })();

// module.exports = User;


const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // your Sequelize instance

const User = sequelize.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name:{
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  address: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  pincode:{
    type: DataTypes.STRING,
    allowNull: false,
  }
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

module.exports = User;
