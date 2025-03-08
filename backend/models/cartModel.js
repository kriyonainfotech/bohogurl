const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');  // your Sequelize instance

const Cart = sequelize.define('Cart', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  product_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name:{
    type:DataTypes.STRING,
    allowNull:false
  },
  quantity: {
    type: DataTypes.INTEGER,
    defaultValue: 1
  },
  price:{
    type:DataTypes.FLOAT,
    allowNull:false
  },
  description:{
    type:DataTypes.TEXT,
    allowNull:true
  }
}, {
  timestamps: true,
});

module.exports = Cart;
