const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Razorpay = require('razorpay');
const { verifyToken } = require('./auth');

const razorpay = new Razorpay({
  key_id: process.env.rzp_live_Su1hNItefRyphU,
  key_secret: process.env.Yo9b0HxVDIO1a8J7o9LdiLTt
});

// Create order
router.post('/create', async (req, res) => {
  try {
    const { customerName, email, phone, address, products, total } = req.body;
    
    const orderId = 'ORD_' + Date.now() + '_' + Math.random().toString(36).substr(2, 6);
    
    const order = new Order({
      orderId,
      customerName,
      email,
      phone,
      address,
      products,
      subtotal: total,
      total,
      paymentMethod: 'razorpay',
      paymentStatus: 'pending'
    });
    
    await order.save();
    
    const razorpayOrder = await razorpay.orders.create({
      amount: total * 100,
      currency: 'INR',
      receipt: orderId,
      payment_capture: 1
    });
    
    order.razorpayOrderId = razorpayOrder.id;
    await order.save();
    
    res.json({
      order,
      razorpayOrderId: razorpayOrder.id,
      razorpayKey: process.env.RAZORPAY_KEY_ID
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Verify payment
router.post('/verify', async (req, res) => {
  try {
    const { orderId, paymentId, signature, razorpayOrderId } = req.body;
    
    const order = await Order.findOne({ orderId });
    if (!order) return res.status(404).json({ message: 'Order not found' });
    
    order.razorpayPaymentId = paymentId;
    order.paymentStatus = 'completed';
    order.orderStatus = 'confirmed';
    await order.save();
    
    res.json({ message: 'Payment verified successfully', order });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all orders (Admin only)
router.get('/', verifyToken, async (req, res) => {
  try {
    const orders = await Order.find().sort('-orderDate').populate('products.productId');
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update order status (Admin only)
router.put('/:id/status', verifyToken, async (req, res) => {
  try {
    const { orderStatus } = req.body;
    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { orderStatus },
      { new: true }
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;