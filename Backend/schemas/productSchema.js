const mongoose = require('mongoose');


const productSchema = new mongoose.Schema({ 
    name: { type: String, required: true },
    price: { type: Number, required: true },
    description: { type: String, required: true },
    category: { type: String, required: true },
    images: { type: [String], required: true }
}, {
  timestamps: true // add created_at and updated_at
});

module.exports = productSchema;
