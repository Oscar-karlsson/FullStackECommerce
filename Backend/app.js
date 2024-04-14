// Importing express
const express = require('express');
const cors = require('cors'); 

// // Importing body-parser - deprecated
// const bodyParser = require('body-parser');

// Importing routes
const productRoutes = require('./routes/ProductRoutes');
const userRoutes = require('./routes/userRoutes');
const messageRoutes = require('./routes/messageRoutes'); 
const orderRoutes = require('./routes/orderRoutes');
const {notFound, errorHandler } = require('./middleware/errorHandlers');

// Initializing express
const app = express();

app.use(cors());



// Bodyparser Middleware
app.use(express.json());


// Serve static files from the 'img' directory
app.use('/public/img', express.static('public/img'));

// Routes
app.use('/api', productRoutes);
app.use('/api', userRoutes);
app.use('/api', messageRoutes);
app.use('/api', orderRoutes);

// 404 Not Found middleware
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Define a simple route for GET request on '/'
app.get('/', (req, res) => {
  res.send('Backend server is running');
});

module.exports = app;