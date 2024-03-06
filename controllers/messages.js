const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const User = require("../models/User");
const Blocked = require("../models/Blocked");
const utils = require("./utils");

// @desc Get all messages. Access level 1 returns no filter - should be used for console. No access level returns active status only - app
// @route GET /api/v1/messages
exports.getMessages = async (req, res, next) => {
    try {
        const { accessLevel } = req.query;
        const filter = accessLevel == 1 ? {} : { status: utils.isActive() };
        const messages = await Message.find(filter).sort({ createdDate: 1 });

        return res.status(200).json(messages);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Get message by ID
// @route GET /api/v1/messages/:id
exports.getMessageByID = async (req, res, next) => {
    try {
        const message = await Message.findById(req.params.id);

        if (!message) {
            return res.status(404).json({
                error: "No message found",
            });
        }

        return res.status(200).json(message);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Add new message
// @route POST /api/v1/messages
exports.addMessage = async (req, res, next) => {
    try {
        const blocked = await Blocked.find({
            conversationId: req.body.conversationId,
        });
        if (blocked.length > 0)
            return res
                .status(403)
                .json({ error: "Can't send message. User blocked" });

        const message = await Message.create(req.body);
        const conversation = await Conversation.findOneAndUpdate(
            {
                _id: req.body.conversationId,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $push: { messages: message._id },
                $set: { seenBy: [req.user.userId] },
            }
        );

        if (
            conversation.status === 0 &&
            conversation.initiatedUser.toString() !== req.body.senderId
        ) {
            this.makeConversationAccepted(
                {
                    body: { conversationId: req.body.conversationId },
                },
                res
            );
        }

        return res.status(201).json(message);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Is first response from other user in convo to make status 1
exports.makeConversationAccepted = async (req, res, next) => {
    try {
        const conversation = await Conversation.findOneAndUpdate(
            {
                _id: req.body.conversationId,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $set: { status: 1 },
            }
        );

        return res.status(201);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Get message by course. Don't really need as messages are returned with course details
// @route GET /api/v1/messages/courses/:id
exports.getMessagesByConversation = async (req, res, next) => {
    try {
        const messages = await Message.find({ courseId: req.params.id });

        if (!messages) {
            return res.status(404).json({
                error: "No message found",
            });
        }

        return res.status(200).json(messages);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc increment view count of message
// @route PATCH /api/v1/messages/view/:id
exports.viewMessage = async (req, res, next) => {
    try {
        const messageId = req.params.id;
        const messageCheck = await Message.findById(messageId);

        if (!messageCheck)
            return res.status(404).json({
                error: "Message not found",
            });
        else {
            const message = await Message.updateOne(
                {
                    _id: messageId,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $inc: { views: 1 },
                }
            );
            return res.status(200).json(true);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc add message id to users messages completed
// @route PATCH /api/v1/messages/complete?messageId=:messageId&userId=:userId
exports.completeMessage = async (req, res, next) => {
    try {
        const { messageId, userId } = req.query;
        const user = await User.findById(userId);
        const messageCheck = await Message.findById(messageId);

        if (!user || !messageCheck)
            return res.status(404).json({
                error: "message or user not found",
            });
        else if (user.messagesCompleted.includes(messageId))
            return res.status(403).json({
                error: "message already completed by user",
            });
        else {
            const updatedUser = await User.updateOne(
                {
                    _id: userId,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $push: { messagesCompleted: messageId },
                }
            );
            return res.status(200).json(true);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc remove message
// @route PATCH /api/v1/messages/remove/:id
exports.removeMessage = async (req, res, next) => {
    try {
        const { id: messageId } = req.params;
        const messageCheck = await Message.findById(messageId);

        if (!messageCheck)
            return res.status(404).json({
                error: "Message not found",
            });
        else {
            const message = await Message.updateOne(
                {
                    _id: messageId,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $set: { status: 2 },
                }
            );
            return res.status(200).json(true);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc update message
// @route PATCH /api/v1/messages/:id
exports.updateMessage = async (req, res, next) => {
    try {
        const { id } = req.params;
        const messageCheck = await Message.findById(id);

        if (!messageCheck)
            return res.status(404).json({
                error: "Message not found",
            });
        else {
            const message = await Message.updateOne(
                {
                    _id: id,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $set: req.body,
                }
            );
            return res.status(200).json(message);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};
