const express = require("express");

const { body, validationResult } = require("express-validator");

const Note = require("../models/Note");
const router = express.Router()
const { findByIdAndUpdate } = require("../models/Book");

// ✅ CREATE Note

router.post(
    "/",
    [
        body("title").notEmpty().withMessage("Title is required"),
        body("content").notEmpty().withMessage("Content is required")
    ],
    async (req, res, next) => {
        try {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() })
            }
            const note = new Note(req.body);
            const savedNote = await note.save();
            res.status(201).json(savedNote)
            console.log("REQQUEST BODY", req.body);
        } catch (err) {
            next(err) // error middleware ko forward
        }
    }
)

router.get("/", async (req, res, next) => {
    try {
        const notes = await Note.find();
        res.json(notes)
    } catch (err) {
        next(err)
    }
})

// Read single Routes

router.get("/:id", async (req, res, next) => {
    try {
        const note = await Note.findById(req.params.id);
        if (!note) return res.status(404).json({ error: "Note not found" })
        res.json(note)
    } catch (err) {
        next(err)
    }
})

router.put("/:id", async (req, res, next) => {
    try {
        const Updatenote = await Note.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!Updatenote) res.status(404).json({ error: "Not not found" })
        res.json(Updatenote)
    } catch (err) {
        next(err)
    }
})
router.delete("/:id", async (req, res, next) => {
    try {
        const deleteNode = await Note.findByIdAndDelete(req.params.id)
        if (!deleteNode) return res.status(404).json({ error: "deleteNode is not found" });
        res.json({ message: "Note deleted", deleteNode: deleteNode })
    } catch (err) {
        next(err)
    }
})
module.exports = router;