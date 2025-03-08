// const { Sequelize, DataTypes } = require("sequelize");
// const bcrypt = require("bcrypt");
// const sequelize = require("./../config/db");

// const Product = sequelize.define("product", {
//     name: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     price: {
//       type: DataTypes.FLOAT,
//       allowNull: true,
//     },
//     imageurl: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     popularity: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },
//     type: {
//       type: DataTypes.STRING,
//       allowNull: true,
//     },    
//     description:{
//         type:DataTypes.STRING,
//         allowNull:false
//     }
//   });
  
//   // Sync the model with the database
//   (async () => {
//     await sequelize.sync();
//     console.log("Product table created (if it doesn't already exist).");
//   })();
  
//   module.exports = Product;
  

const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // your Sequelize instance

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  type:{
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
}, {
  timestamps: true,  // Automatically adds createdAt and updatedAt fields
});

module.exports = Product;
