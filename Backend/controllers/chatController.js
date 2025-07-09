const Chat = require('../models/chatModel');
const catchAsync = require('../middlewares/catchAsync');

exports.createChatController = catchAsync(async (req, res) => {
    const currentUserId = req.userId;
    const friendId = req.body.userId;

    // Check if chat already exists
    const existing = await Chat.findOne({
        users: { $all: [currentUserId, friendId] }
    }).populate("users", "name username avatar")
        .populate("latestMessage");

    if (existing) return res.json({ chat: existing });

    // Create new chat
    let chat = await Chat.create({
        users: [currentUserId, friendId]
    });
    chat = await Chat.findById(chat._id)
            .populate("users", "name username avatar")
            .populate("latestMessage");
    res.status(201).json({ chat });
});

exports.getUserChatsController = catchAsync(async (req, res) => {
    const chats = await Chat.find({ users: req.userId })
        .populate("users", "name username avatar")
        .populate("latestMessage")
        .sort({ updatedAt: -1 });

    res.json({ chats : chats});
});
