const express = require("express");
const router = express.Router({ mergeParams: true });
const { authMiddleware } = require("../middleware/authMiddleware");
const { addComment, getComments } = require("../controllers/commentController");

router.post("/", authMiddleware, addComment)
router.get("/", getComments)

module.exports = router