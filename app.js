const express = require("express");
const { default: mongoose } = require("mongoose");

const app = express();
app.use(express.json())


// const books = [
//     { id: 1, title: "Atomic Habits", author: "James Clear" },
//     { id: 2, title: "Ikigai", author: "Garcia & Miralles" },
//     { id: 3, title: "Rich Dad Poor Dad", author: "Robert Kiyosaki" }
// ];



// //Get all books

// app.get('/books', (req, res) => {
//     res.json(books)
// })

// app.get('/books/:id', (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (book) res.json(book)
//     else res.status(404).json({ error: "Book n0t found" })
// })

// app.post("/books", (req, res) => {
//     const { title, author } = req.body || {};
//     const newBook = {
//         id: books.length + 1,
//         title,
//         author
//     };
//     books.push(newBook)
//     res.status(201).json(newBook)
// })

// app.put("/books/:id", (req, res) => {
//     const book = books.find(b => b.id === parseInt(req.params.id));
//     if (!book) return res.status(404).json({ error: "Book not found" })

//     const { title, author } = req.body || {}
//     if (title) book.title = title;
//     if (author) book.author = author

//     res.json(book)
// })

// app.delete('/books/:id', (req, res) => {
//     const bookIndex = books.findIndex(b => b.id === parseInt(req.params.id));
//     if (bookIndex === -1) return res.status(404).json({ error: "Book not deleted" })

//     const deletedBook = books.splice(bookIndex, 1);
//     res.json({ message: "Book deleted", deleted: deletedBook })
// })

app.listen(3000, () => {
    console.log("Book store Api running at http://Localhost:3000");
})
