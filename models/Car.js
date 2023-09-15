const mongoose = require("mongoose");

const carSchema = new mongoose.Schema({
    plate: {
        type: String,
        required: true,
        trim: true,
    },
    make: {
        type: String,
        trim: true,
        default: "",
    },
    model: {
        type: String,
        trim: true,
        default: "",
    },
    colour: {
        type: String,
        trim: true,
        default: "",
    },
});

module.exports = mongoose.model("Car", carSchema);
