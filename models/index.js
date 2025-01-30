const User = require('./auth');
const Product = require('./productmodel');
const Cart = require('./cartModel');
const Order = require('./orderModel');
const OrderItems=require('./orderItems')

// User has many Carts
User.hasMany(Cart, { foreignKey: 'user_id' });
Cart.belongsTo(User, { foreignKey: 'user_id' });

// User has many Orders
User.hasMany(Order, { foreignKey: 'user_id' });
Order.belongsTo(User, { foreignKey: 'user_id' });

// Order has many OrderItems
Order.hasMany(OrderItems, { foreignKey: 'order_id' });
OrderItems.belongsTo(Order, { foreignKey: 'order_id' });

// Product has many OrderItems
Product.hasMany(OrderItems, { foreignKey: 'product_id' });
OrderItems.belongsTo(Product, { foreignKey: 'product_id' });

// User can have many Cart Items (Products)
Cart.belongsTo(Product, { foreignKey: 'product_id',as :'product' });

module.exports = { User, Product, Cart, Order, OrderItems };
