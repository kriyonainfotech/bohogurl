// const jwt = require('jsonwebtoken');
// const Cart = require('../models/cartModel');  // Your Cart model
// require('dotenv').config();
// const Product = require('../models/productmodel');

// // Middleware to authenticate user
// const authenticateUser = (req, res, next) => {
//   const token = req.header('Authorization')?.replace('Bearer ', '');  // Get token from Authorization header
  
//   if (!token) {
//     return res.status(401).json({ error: 'Access denied. No token provided.' });
//   }
  
//   try {
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify JWT token
//     req.user = decoded;  // Attach user info to request
//     next();
//   } catch (error) {
//     return res.status(400).json({ error: 'Invalid or expired token.' });
//   }
// };


// // Add product to cart
// const addToCart = async (req, res) => {
//   const { user_id, product_id, quantity } = req.body;
  
//   try {
//     const existingItem = await Cart.findOne({ user_id, product_id });
//     if (existingItem) {
//       existingItem.quantity += quantity;  // Update quantity if the product already exists in the cart
//       await existingItem.save();
//       return res.status(200).json({ message: "Product quantity updated in cart" });
//     }

//     const cartItem = new Cart({
//       user_id,
//       product_id,
//       quantity,
//     });
//     await cartItem.save();
//     res.status(200).json({ message: "Product added to cart" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error adding item to cart" });
//   }
// };

// // Get cart items for a user
// const getCartItems = async (req, res) => {
//   const { userId } = req.params;
  
//   try {
//     const cartItems = await Cart.find({ user_id: userId }).populate('product_id');
//     res.status(200).json({ cartItems });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error fetching cart items" });
//   }
// };

// // Remove product from cart
// const removeFromCart = async (req, res) => {
//   const { user_id, product_id } = req.body;
  
//   try {
//     const result = await Cart.deleteOne({ user_id, product_id });

//     if (result.deletedCount === 0) {
//       return res.status(404).json({ message: "Product not found in cart" });
//     }

//     res.status(200).json({ message: "Product removed from cart" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Error removing item from cart" });
//   }
// };

// module.exports = { addToCart, getCartItems, removeFromCart,authenticateUser };


const jwt = require('jsonwebtoken');
const Cart = require('../models/cartModel');  // Your Cart model
require('dotenv').config();
const Product = require('../models/productmodel');

// Middleware to authenticate user
const authenticateUser = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');  // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ error: 'Access denied. No token provided.' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);  // Verify JWT token
    req.user = decoded;  // Attach user info to request
    next();
  } catch (error) {
    return res.status(400).json({ error: 'Invalid or expired token.' });
  }
};

const addToCart = async (req, res) => {
  try {
    const { product_id, quantity ,price,description,name} = req.body;
    const user_id = req.user.id; // Extract user_id from authenticated user

    if (!product_id || !quantity) {
      return res.status(400).json({ error: "Missing required fields: product_id or quantity" });
    }

    const existingItem = await Cart.findOne({
      where: { user_id, product_id },
    });
    if (existingItem) {
      existingItem.quantity += quantity;  // Update quantity if the product already exists in the cart
      await existingItem.save();
      return res.status(200).json({ message: "Product quantity updated in cart", cartItem: existingItem });
    }

    const cartItem = await Cart.create({
      user_id,
      product_id,
      quantity,
      price,
      description,
      name
    });

    res.status(201).json({ message: "Product added to cart", cartItem });
  } catch (error) {
    console.error("Error adding item to cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Get cart items for a user
const getCartItems = async (req, res) => {
  try {
    const user_id = req.user.id; // Extract user_id from authenticated user
    
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required." });
    }
    const cartItems = await Cart.findAll({
      where: { user_id },
      include: [{
        model: Product, // Assuming you have a Product model
        as: 'product', // Adjust the alias as needed
        attributes: ['id', 'name', 'price', 'image_url'],
      }],
    });
    res.status(200).json({ cartItems });
  } catch (error) {
    console.error("Error fetching cart items:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Remove product from cart
const removeFromCart = async (req, res) => {
  try {
    const { product_id } = req.body;
    const user_id = req.user.id; // Extract user_id from authenticated user

    if (!user_id || !product_id) {
      return res.status(400).json({ error: "Missing required field: product_id" });
    }

    const result = await Cart.destroy({
      where: { user_id, product_id },
    });

    if (result === 0) {
      return res.status(404).json({ error: "Product not found in cart" });
    }
  } catch (error) {
    console.error("Error removing item from cart:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// Define authenticateUser function if it's missing


module.exports = { addToCart, getCartItems, removeFromCart, authenticateUser };
