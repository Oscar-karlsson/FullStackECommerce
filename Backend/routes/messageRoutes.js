const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// POST endpoint for sending a message
router.post('/messages', messageController.sendMessage);

module.exports = router;