// server.js (corrected)
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/auth');
const orderRoutes = require('./routes/orderRoutes'); // ✅ keep this

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/orders', require('./routes/order'));

app.use('/api/auth', authRoutes);
app.use('/api/orders', orderRoutes); // ✅ only this

app.get('/', (req, res) => {
  res.send('🍔 Online Food Delivery API is running...');
});

mongoose.connect('mongodb://127.0.0.1:27017/foodAppDB', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch((err) => console.error("MongoDB connection error:", err.message));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});


// Optional: Graceful error handling for unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('💥 Unhandled Rejection:', err.message);
  process.exit(1);
});
