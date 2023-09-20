const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        default: "",
    },
    timeLength: {
        type: Number,
        default: -1.0,
    },
    videoURI: {
        type: String,
        required: true,
        trim: true,
    },
    courseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course",
        required: true,
    },
    thumbnail: {
        type: String,
        default: "",
    },
    difficulty: {
        type: Number,
        default: 0,
    },
    order: Number,
    pageReference: {
        type: Number,
        default: -1,
    },
    views: {
        type: Number,
        default: 0,
    },
    status: {
        type: Number,
        default: 1,
    },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
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
