// Importing dotenv
require('dotenv').config();
// Importing mongoose
const mongoose = require('mongoose');
// Importing the app configuration
const app = require('./app');

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Start the server
const PORT = process.env.PORT || 6969;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
