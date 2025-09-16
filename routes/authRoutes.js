const express = require("express");
const router = express.Router();
const { signup, login } = require("../controllers/authController");

// 🔍 Debug middleware for all auth routes
router.use((req, res, next) => {
    console.log("=== AUTH ROUTE MIDDLEWARE ===");
    console.log("Method:", req.method);
    console.log("URL:", req.url);
    console.log("Headers:", req.headers);
    console.log("Body in route middleware:", req.body);
    console.log("============================");
    next();
});

// Signup
router.post("/signup", signup)

// Login
router.post("/login", login)

module.exports = router