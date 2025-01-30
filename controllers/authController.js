
const User = require('../models/auth'); // Importing the Sequelize model
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const ADMIN_USERNAME = 'admin@gmail.com';
const ADMIN_PASSWORD = 'admin123';

// Utility function to generate JWT token
const generateToken = (user) => {
  // The payload can include user id and email (or other info if necessary)
  return jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET);
};

// Controller for signup
const signup = async (req, res) => {
  const { name, phone, address, dob, email, pincode, password } = req.body;

  try {
    // Check if the email already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const newUser = await User.create({
      name,
      phone,
      address,
      dob,
      email,  
      pincode,
      password: hashedPassword, // Store the hashed password
    });

    // Generate JWT token
    const token = generateToken(newUser);
    console.log('token is:', token);

    // Send the response along with token
    res.status(201).json({ message: 'User signed up successfully', user: newUser, token });
  } catch (err) {
    console.error('Error during signup:', err);
    res.status(500).json({ message: 'Error creating user' });
  }
};

// Controller for login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

   
  
    // Validate user credentials
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    // Generate JWT token
    const token = generateToken(user);

    // Send the token as response
    return res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
};

// Controller for logout
const logout = async (req, res) => {
  res.clearCookie('token');  // Clear token stored in cookies (if using cookies)
  res.status(200).send({ message: 'Logged out successfully' });
};

const getUsers=async (req,res)=>{
  try {
    const users=await User.findAll({
      attributes:['id','name','email','phone','address','pincode']
    });
    res.status(200).json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Failed to fetch users' });
  }
}

const adminCredential={
  email:'admin@bohogurl.com',
  password:'admin123'
}


module.exports = { signup, login, logout,getUsers};
