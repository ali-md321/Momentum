const Message = require('../models/messageModel');
const Chat = require('../models/chatModel');
const catchAsync = require('../middlewares/catchAsync');

exports.sendMessageController = catchAsync(async (req, res) => {
    const { chatId, content } = req.body;

    const message = await Message.create({
        sender: req.userId,
        content,
        chatId
    });

    await Chat.findByIdAndUpdate(chatId, {
        latestMessage: message._id,
    });

    res.status(201).json({ message });
});

exports.getMessagesController = catchAsync(async (req, res) => {
    const messages = await Message.find({ chatId: req.params.chatId })
        .populate("sender", "name username avatar");

    res.json({ messages });
});
