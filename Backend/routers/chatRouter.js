const express = require('express');
const router = express.Router();
const { createChatController, getUserChatsController } = require('../controllers/chatController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.post('/chat', isAuthenticated, createChatController);
router.get('/chats', isAuthenticated, getUserChatsController);

module.exports = router;
