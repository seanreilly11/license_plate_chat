const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const User = require("../models/User");
const utils = require("./utils");
const mongoose = require("mongoose");

// @desc Get all conversation
// @route GET /api/conversation
exports.getConversations = async (req, res, next) => {
    try {
        const { accessLevel } = req.query;
        const filter = accessLevel == 1 ? {} : { status: utils.isActive() };
        const conversation = await Conversation.find(filter).sort({
            status: 1,
            createdDate: 1,
        }); // active ones on top sorted by date

        return res.status(200).json(conversation);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Get course by ID
// @route GET /api/conversation/:id
exports.getConversationByID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        let otherUserId;

        // get conversation details
        const conversation = await Conversation.findOneAndUpdate(
            { _id: id },
            {
                $addToSet: { seenBy: req.user.userId },
            }
        );
        // get messages for that conversation
        const messages = await Message.find({ conversationId: id }).sort({
            createdDate: 1,
        });
        // find the other user in the conversation
        conversation.users.forEach((user) => {
            if (user !== userId) otherUserId = user;
        });
        // get the other users details
        const userDetails = await User.aggregate([
            { $match: { _id: new mongoose.Types.ObjectId(otherUserId) } },
            {
                $lookup: {
                    from: "cars",
                    localField: "carId",
                    foreignField: "_id",
                    as: "carDetails",
                },
            },
            { $unwind: "$carDetails" },
        ]);

        if (!conversation)
            return res.status(404).json({
                error: "No conversation found",
            });

        // return the conversation details with the messages and user details
        return res.status(200).json({
            ...conversation._doc,
            messages,
            userDetails: userDetails[0],
        });
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Get users conversations
// @route GET /api/conversation/:id
exports.getConversationsByUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { accessLevel } = req.query;
        const filter =
            accessLevel == 1
                ? { users: { $in: [id] } }
                : { users: { $in: [id] }, status: utils.isActive() };

        const conversations = await Conversation.find(filter, {});

        if (!conversations)
            return res.status(404).json({
                error: "No conversation found",
            });

        return res.status(200).json(conversations);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Get conversation Id by convo ID if exists otherwise create it
// @route GET /api/conversation/find/:id
exports.getConversationByConvoID = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { loggedInUserID } = req.query;
        const filter = { conversationId: id, status: utils.isActive() };

        const conversation = await Conversation.findOne(filter);

        if (conversation) return res.status(200).json(conversation);

        return this.createConversation(
            { body: { conversationId: id, loggedInUserID } },
            res
        );
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Add new conversation
// @route POST /api/conversations
exports.createConversation = async (req, res, next) => {
    try {
        const { conversationId, loggedInUserID } = req.body;
        const conversation = await Conversation.findOne({ conversationId });

        if (conversation)
            return res.status(409).json({
                error: conversation,
            });

        const newConversation = new Conversation({
            conversationId,
            initiatedUser: new mongoose.Types.ObjectId(loggedInUserID),
            users: conversationId.split("||"),
        });
        newConversation
            .save()
            .then((result) => {
                return res.status(201).json(result);
            })
            .catch((err) => {
                return res.status(500).json({
                    error: err.message,
                });
            });
    } catch (err) {
        if (err.name === "ValidationError") {
            const messages = Object.values(err.errors).map(
                (val) => val.message
            );
            return res.status(400).json({
                error: messages,
            });
        } else {
            return res.status(500).json({
                error: "Server error",
            });
        }
    }
};

// @desc update conversation details
// @route PATCH /api/conversation/:id
exports.updateConversation = async (req, res, next) => {
    try {
        const { id } = req.params;
        const conversationCheck = await Conversation.findById(id);

        if (!conversationCheck)
            return res.status(404).json({
                error: "Conversation not found",
            });
        else {
            const conversation = await Conversation.updateOne(
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
            return res.status(200).json(conversation);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// TODO: fix this. Need to understand what it's actually for
// @desc increment students count of conversation
// @route PATCH /api/v1/conversation/enrol?courseId=:courseId&userId=:userId
exports.addStudentToConversation = async (req, res, next) => {
    try {
        const { conversationId, userId } = req.query;
        const user = await User.findById(userId);
        const conversationCheck = await Conversation.findById(conversationId);

        if (!user || !conversationCheck)
            return res.status(404).json({
                error: "conversation or user not found",
            });
        else if (user.conversationCompleted.includes(conversationId))
            return res.status(403).json({
                error: "User already enrolled in conversation",
            });
        else {
            const conversation = await Conversation.updateOne(
                {
                    _id: conversationId,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $inc: { totalStudents: 1 },
                }
            );
            const updatedUser = await User.updateOne(
                {
                    _id: userId,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $push: { conversationCompleted: conversationId },
                }
            );
            return res.status(200).json(video);
        }
    } catch (err) {
        return res.status(500).json({
            error: err.message,
        });
    }
};

// @desc remove conversation
// @route PATCH /api/v1/conversation/remove/:id
exports.removeConversation = async (req, res, next) => {
    try {
        const { id: conversationId } = req.params;
        const conversationCheck = await Conversation.findById(conversationId);

        if (!conversationCheck)
            return res.status(404).json({
                error: "conversation not found",
            });
        else {
            const conversation = await Conversation.updateOne(
                {
                    _id: conversationId,
                },
                {
                    $currentDate: {
                        updatedDate: true,
                    },
                    $set: { status: 2 },
                }
            );
            const message = await Message.updateMany(
                {
                    conversationId: conversationId,
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
