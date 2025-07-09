const express = require('express');
const router = express.Router();
const { sendMessageController, getMessagesController } = require('../controllers/messageController');
const { isAuthenticated } = require('../middlewares/isAuthenticated');

router.post('/message', isAuthenticated, sendMessageController);
router.get('/messages/:chatId', isAuthenticated, getMessagesController);

module.exports = router;
