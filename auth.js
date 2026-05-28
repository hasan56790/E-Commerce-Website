const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Admin = require('../models/Admin');

// Admin Login
router.post('/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const admin = await Admin.findOne({ username });
    
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const token = jwt.sign(
      { id: admin._id, username: admin.username, role: 'admin' },
      process.env.JWT_SECRET || 'your_jwt_secret',
      { expiresIn: '7d' }
    );
    
    res.json({
      token,
      admin: {
        id: admin._id,
        username: admin.username,
        email: admin.email
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Verify Token Middleware
const verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  
  if (!token) {
    return res.status(401).json({ message: 'Access denied' });
  }
  
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_jwt_secret');
    req.admin = verified;
    next();
  } catch (error) {
    res.status(401).json({ message: 'Invalid token' });
  }
};

// Create default admin (run once)
router.post('/setup', async (req, res) => {
  try {
    const existingAdmin = await Admin.findOne({ username: 'alnasr_admin' });
    if (!existingAdmin) {
      const admin = new Admin({
        username: 'alnasr_admin',
        email: 'admin@alnasrfragrances.com',
        password: 'Admin@123'
      });
      await admin.save();
      res.json({ message: 'Admin created successfully. Username: alnasr_admin, Password: Admin@123' });
    } else {
      res.json({ message: 'Admin already exists' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error creating admin' });
  }
});

module.exports = router;
module.exports.verifyToken = verifyToken;