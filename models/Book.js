const mongoose = require("mongoose");

// Schema & Model

const bookSchema = new mongoose.Schema({
    title: String,
    author: String
});

module.exports = mongoose.model("Book", bookSchema)