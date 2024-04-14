const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const userController = require('../controllers/userController');

// User registration route
router.post('/users/register', userController.register);

// Get all users route
router.get('/users', authMiddleware, userController.getAllUsers);

// User login route
router.post('/users/login', userController.login);

// Password change route
router.post('/users/change-password', authMiddleware, userController.changePassword);

module.exports = router;