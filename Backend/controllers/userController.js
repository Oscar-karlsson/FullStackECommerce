const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// User registration
exports.register = async (req, res) => {
    try {
        const {password, email} = req.body;
        const user = new User({email, password});
        await user.save();
        const token = jwt.sign({userId: user._id}, process.env.JWT_SECRET, {expiresIn: '24h'});
        res.status(201).json({message: 'User created successfully', token, user: {email}}); // Return the message, token, and the user's email
    } catch (err) {
        res.status(400).json({message: err.message});
    }
};

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password'); // Exclude passwords from the result
        res.json(users);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// User login
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        
        // Find the user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // Compare the provided password with the hashed password in the database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // If the password matches, sign a JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '24h' });

        // Send the token and the success message in the response
  return res.json({ message: 'Login successful', token });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Password change
exports.changePassword = async (req, res) => {
    try {
        const { currentPassword, newPassword } = req.body;
        const userId = req.user.userId;

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Current password is incorrect.' });
        }

        const hashedPassword = await bcrypt.hash(newPassword, 8);
        user.password = hashedPassword;
        await user.save();

        res.json({ message: 'Password successfully updated.' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};