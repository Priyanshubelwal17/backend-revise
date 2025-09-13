const mongoose = require("mongoose");

// Note ka structure define karna (Schema)
const NoteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true

    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});


module.exports = mongoose.model("Note", NoteSchema);