const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: [true, 'Email is required.'],
        unique: true,
    },
    password: {
      type: String,
      required: [true, 'Password is required.'],
    },
});

// Hash the password before saving the user
userSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 8);
    }
    next();
});

module.exports = userSchema;
