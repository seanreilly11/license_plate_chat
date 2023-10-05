const mongoose = require("mongoose");
const User = require("./User");

const blockedSchema = new mongoose.Schema({
    blockerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    blockeeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    reason: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        default: 1,
    },
    createdDate: {
        type: Date,
        default: Date.now,
    },
    updatedDate: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("Blocked", blockedSchema);
