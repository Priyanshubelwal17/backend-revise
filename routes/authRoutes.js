const express = require("express");
const jwt = require("jsonwebtoken")
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();
const { route } = require("./bookRoutes");

const SECRET_KEY = "supersecret123";


//Signup
router.post("/signup", async (req, res) => {
    try {
        const { username, password } = req.body;

        //Check user already exits
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "User already exits" })

        //hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, password: hashedPassword });

        await user.save()

        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }


})

// Login
router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;

        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ error: "User not found" })

        //compare password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: "Invalid password" })

        //generate token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token })


    } catch (err) {
        res.status(500).json({ message: err.message })

    }
})
module.exports = router