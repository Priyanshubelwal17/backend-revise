const express = require("express");
const Book = require("../models/Book");
const router = express.Router();
const BookController = require("../controllers/bookController");




router.post("/", BookController.addBook);


router.get("/", BookController.readBook)

router.get("/:id", BookController.readParticuarBook)

router.put("/:id", BookController.updateBook)

router.delete("/:id", BookController.deleteBook)

module.exports = router