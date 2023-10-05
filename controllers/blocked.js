const mongoose = require("mongoose");
const User = require("../models/User");
const Blocked = require("../models/Blocked");
const Car = require("../models/Car");
const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// @desc Get all blocked items
// @route GET /api/v1/blocked
exports.getAllBlocked = async (req, res) => {
    try {
        const blocked = await Blocked.find();
        return res.status(200).json(blocked);
    } catch (err) {
        return res.status(500).json({ error: err.message });
    }
};

// @desc Add new blocked item
// @route POST /api/conversations
exports.createBlocked = async (req, res, next) => {
    try {
        const { blockerId, blockeeId, reason } = req.body;
        const blocked = await Blocked.findOne({ blockeeId, blockerId });

        if (blocked)
            return res.status(409).json({
                error: "User already blocked",
            });

        const newBlocked = new Blocked({
            blockerId,
            blockeeId,
            reason,
        });
        const user = await User.findOneAndUpdate(
            {
                _id: blockerId,
            },
            {
                $currentDate: {
                    updatedDate: true,
                },
                $push: { blockedUsers: blockeeId },
            }
        );
        newBlocked
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
