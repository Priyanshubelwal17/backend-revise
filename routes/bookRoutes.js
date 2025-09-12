const express = require("express");
const Book = require("../models/Book");
const router = express.Router();





router.post("/", async (req, res) => {
    const book = new Book(req.body);
    await book.save();
    res.status(201).json(book);
});


router.get("/", async (req, res) => {
    const books = await Book.find();
    res.json(books)
})

router.get("/:id", async (req, res) => {
    const book = await Book.findById(req.params.id);
    if (!book) res.status(404).json({ error: "Book not found" })
    res.json(book)
})

router.put("/:id", async (req, res) => {
    const updatedBook = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBook) res.status(404).json({ error: "Book not found" })
    res.json(updatedBook)
})
router.delete("/:id", async (req, res) => {
    const deletedBook = await Book.findByIdAndDelete(req.params.id);
    if (!deletedBook) res.status(404).json({ error: "Book not found" })
    res.json({ message: "Book deleted", deleted: deletedBook })
})

module.exports = router