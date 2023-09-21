const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    conversationId: {
        type: String,
        required: true,
        trim: true,
    },
    messages: {
        type: [String],
        default: [],
    },
    users: {
        type: [String],
        default: [],
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

module.exports = mongoose.model("Conversation", conversationSchema);
