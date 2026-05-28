const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const { verifyToken } = require('./auth');

// Get all products
router.get('/', async (req, res) => {
  try {
    const { category, sort, limit, featured, bestseller } = req.query;
    let query = {};
    
    if (category) query.category = category;
    if (featured === 'true') query.featured = true;
    if (bestseller === 'true') query.bestseller = true;
    
    let productsQuery = Product.find(query);
    
    if (sort === 'price_asc') productsQuery = productsQuery.sort('price');
    if (sort === 'price_desc') productsQuery = productsQuery.sort('-price');
    if (sort === 'newest') productsQuery = productsQuery.sort('-createdAt');
    
    if (limit) productsQuery = productsQuery.limit(parseInt(limit));
    
    const products = await productsQuery;
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (Admin only)
router.post('/', verifyToken, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update product (Admin only)
router.put('/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete product (Admin only)
router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;