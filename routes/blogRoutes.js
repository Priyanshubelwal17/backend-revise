const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const upload = require("../utils/multer");
const { authMiddleware } = require("../middleware/authMiddleware");

const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog, toggleLike } = require("../controllers/blogController");

router.post("/", authMiddleware, upload.single("image"), createBlog)
router.get("/", getAllBlogs)
router.get("/:id", getBlogById)
router.put("/:id", updateBlog)
router.delete("/:id", deleteBlog)
router.post("/:id/like", authMiddleware, toggleLike)

module.exports = router
