const express = require("express");
const mongoose = require("mongoose");
const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const auth = require("./middleware/authMiddlerware");
const app = express();
app.use(express.json())
require("dotenv").config()
app.use("/books", bookRoutes)
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const noteRoutes = require("./routes/noteRoutes");

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

//  ✅ Body parser
app.use(express.json())


// // ✅ Logger 
app.use(morgan("dev"))

// ✅ Rate limiter (har IP ko 1 min me max 10 requests)

const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 10,
    message: "Too many requests, piease try agian later"
});
app.use(limiter)

// mongoose.connect("mongodb://127.0.0.1:27017/bookstore")
//     .then(() => console.log("✅ MongoDB connected locally"))
//     .catch(() => console.error("❌ Connection error:", err))

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected locally"))
    .catch(() => console.error("❌ Connection error:", err))

// ROutes
app.use("/auth", authRoutes)

// ROutes
app.use("/notes", noteRoutes)

app.get("/", (req, res) => {
    res.send("Notes API Running with Middleware")
})

app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.message);
    res.status(500).json({ error: "Something went wrong" })
})

// Example of protected route
app.get("/secret", auth, (req, res) => {
    res.json({ message: "Welcome to secret route", user: req.user })
})



// app.get("/", (req, res) => {
//     res.send("Local Bookstore API is working")

// })

// app.use((err, req, res, next) => {
//     console.error(err.stack);
//     res.status(500).json({ error: "Something went worng!" })
// })

app.listen(3000, () => {
    console.log("Book store Api running at http://Localhost:3000");
})
