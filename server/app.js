const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const path = require('path');
const colors = require('colors');
const connectDB = require('./config/db');
const { notFound, errorHandler } = require('./middlewares/errorHandler');
require('dotenv').config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Set static folder
app.use(express.static(path.join(__dirname, 'public')));

// Define Routes
app.use('/api/items', require('./routes/itemRoutes'));

// Basic route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to MERN Stack API' });
});

// Error Handlers
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
);

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`.red);
  // Close server & exit process
  server.close(() => process.exit(1));
});

// Add colors to console
colors.setTheme({
  error: 'red',
  warn: 'yellow',
  info: 'cyan',
  success: 'green',
});
