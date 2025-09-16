require("dotenv").config()
const express = require("express");
const app = express();

// ✅ Body parser FIRST - This was your issue!
app.use(express.json())
app.use(express.urlencoded({ extended: true }));

const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");

const auth = require("./middleware/authMiddleware");
const rateLimit = require("express-rate-limit");

const bookRoutes = require("./routes/bookRoutes");
const authRoutes = require("./routes/authRoutes");
const noteRoutes = require("./routes/noteRoutes");
const imageRoutes = require("./routes/imageRoutes");
const commentROutes = require("./routes/commentRoutes");
const blogRoutes = require("./routes/blogRoutes");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ Logger 
app.use(morgan("dev"))

// ✅ Rate limiter - Fixed the typo and increased limit
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000,
    max: 100, // Increased from 10 for development
    message: "Too many requests, please try again later" // Fixed typo
});
app.use(limiter)

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("✅ MongoDB connected locally"))
    .catch((err) => console.error("❌ Connection error:", err)) // Fixed the error reference

// Routes
app.use("/notes", noteRoutes)

app.get("/", (req, res) => {
    res.send("Notes API Running with Middleware")
})

app.use("/images", imageRoutes);

app.use("/auth", authRoutes) // This is your main route that was failing
app.use("/blogs", blogRoutes)
app.use("/blogs/:blogId/comments", commentROutes)

app.use((err, req, res, next) => {
    console.error("🔥 Error:", err.message);
    res.status(500).json({ error: "Something went wrong" })
})

app.listen(3000, () => {
    console.log("Book store Api running at http://Localhost:3000");
})