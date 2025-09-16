const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SECRET_KEY = "supersecret123";
exports.signup = async (req, res) => {
    try {
        console.log("RAW BODY:", req.body);
        const { username, email, password } = req.body;

        // Check user already exits
        const existingUser = await User.findOne({ username });
        if (existingUser) return res.status(400).json({ error: "User already exits" })



        const user = new User({ username, email, password });

        await user.save()

        res.status(201).json({ message: "User created successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
        console.error(err);
    }


}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) return res.status(401).json({ error: "Invalid credentials" })


        //generate token
        const token = jwt.sign({ id: user._id }, SECRET_KEY, { expiresIn: "1h" });

        res.json({ message: "Login successful", token })


    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}