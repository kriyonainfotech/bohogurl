const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();

// Dummy credentials for admin login
const ADMIN_EMAIL = 'admin@bohogurl.com';
const ADMIN_PASSWORD = 'admin123';

// Middleware to verify JWT token (for later use)
const verifyAdminToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) return res.sendStatus(403);

  jwt.verify(token, 'admin_secret_key', (err, admin) => {
    if (err) return res.sendStatus(403);
    req.admin = admin;
    next();
  });
};

const adminLogin=async (req,res)=>{
    const {email,password}=req.body
    if(email===ADMIN_EMAIL && password===ADMIN_PASSWORD)
    {
        const token = jwt.sign({ email }, 'admin_secret_key', { expiresIn: '1h' });
        return res.json({ token, adminId: 1 }); // Return admin ID and token
    }else{
        return res.status(401).json({ message: 'Invalid admin credentials' });
    }
}

// Admin login route


// Example of protected route (admin dashboard)
        // app.get('/admin-dashboard', verifyAdminToken, (req, res) => {
        // res.send('Welcome to the Admin Dashboard');
        // });
module.exports={adminLogin};