const express = require('express');
const router = express.Router();
const { authenticateUser, addToCart, getCartItems,removeFromCart} = require('../controllers/cartController');  // Import controller functions

// Route to add item to cart
router.post('/add', authenticateUser,addToCart);  // Protect this route with authenticateUser middleware

// Route to get cart items for the authenticated user
router.get('/:userId', authenticateUser, getCartItems);  // Protect this route with authenticateUser middleware
router.delete('/remove', authenticateUser, removeFromCart);
module.exports = router;

