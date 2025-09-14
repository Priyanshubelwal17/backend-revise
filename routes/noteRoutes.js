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
router.get("/search/:keyword", async (req, res) => {
    try {
        const keyword = req.params.keyword;

        //MongoDB regex query -> casse- insensitive search 
        const notes = await Note.find({
            title: { $regex: keyword, $options: "i" }
        });
        if (notes.length === 0) {
            return res.status(404).json({ message: "No notes found with that title" })


        }

        res.json(notes)

    } catch (err) {
        next(err)
    }
})
router.get("/advanced/query", async (req, res) => {
    try {
        //Query Parametes (Postman ya URL se aayenge)
        const { sortBy, order, page, limit, keyword } = req.query;

        // 1. Search filter (optional)
        let filter = {};
        if (keyword) {
            filter.title = { $regex: keyword, $options: "i" }
        }

        // 2. Sorting setup
        let sortOptions = {};
        if (sortBy) {
            //Default asccending (1),descending (-1) agar order = desc
            sortOptions[sortBy] = order === "desc" ? -1 : 1
        }

        // 3. Pagination Setup
        const pageNum = parseInt(page) || 1;
        const limitNum = parseInt(limit) || 5;
        const skip = (pageNum - 1) * limitNum;

        // 4. Query execute
        const notes = await Note.find(filter)
            .sort(sortOptions)
            .skip(skip)
            .limit(limitNum)

        // 5. Total count for pagination info
        const totalNotes = await Note.countDocuments(filter);

        res.json({
            total: totalNotes,
            page: pageNum,
            limit: limitNum,
            resuts: notes.length,
            notes
        })
    } catch (err) {
        next(err)
    }
})
module.exports = router;