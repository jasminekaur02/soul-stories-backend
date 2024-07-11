// Load environment variables from .env file
require('dotenv').config();

// Import necessary modules
const express = require('express');
const app = express();

// Import your custom routes and middleware
const readingRoutes = require('./src/routes/reading');
const errorHandler = require('./src/middleware/errorHandler');

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Use the custom routes for handling reading-related API endpoints
app.use('/api/reading', readingRoutes);

// Use the error handling middleware for handling errors
app.use(errorHandler);

// Define the port to listen on, defaulting to 3000
const PORT = process.env.PORT || 3000;

// Start the server and listen on the specified port
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
