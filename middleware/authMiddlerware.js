const jwt = require("jsonwebtoken");
const SECRET_KEY = "supersecret123";

function auth(req, res, next) {
    const token = req.header("Authorization")?.split(" ")[1];
    console.log(token);
    if (!token) return res.status(404).json({ error: "Access is denied, token missing" })

    try {
        const verified = jwt.verify(token, SECRET_KEY);
        req.user = verified; // user ka data attach kar diya
        next();
    } catch (err) {
        res.status(400).json({ error: "Invalid token" })
    }
}

module.exports = auth;