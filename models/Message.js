const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    conversationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Conversation",
        required: true,
    },
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    senderName: String,
    viewed: {
        type: Number,
        default: 0,
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

module.exports = mongoose.model("Message", messageSchema);
