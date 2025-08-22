// backend/routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

router.post('/place', async (req, res) => {
  const { customerName, contactNumber, address, items, deliveryDate, userId } = req.body;
  const order = new Order({ customerName, contactNumber, address, items, deliveryDate, userId });
  await order.save();
  res.send('Order placed');
});

router.get('/:userId', async (req, res) => {
  const orders = await Order.find({ userId: req.params.userId });
  res.json(orders);
});

module.exports = router;
