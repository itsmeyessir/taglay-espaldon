const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const errorHandler = require('./middleware/errorHandler');
const authRoutes = require('./routes/authRoutes');
const productRoutes = require('./routes/productRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const app = express();

// Middleware
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies
app.use(cookieParser()); // Parse cookies
app.use(cors({
  origin: 'http://localhost:5173', // Allow frontend (Vite default port)
  credentials: true // Allow cookies to be sent
})); 
app.use(helmet()); // Set security headers
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev')); // Logging
}

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);

app.get('/', (req, res) => {
  res.send('Taglay API is running...');
});

// Error Handler (Must be last)
app.use(errorHandler);

module.exports = app;
