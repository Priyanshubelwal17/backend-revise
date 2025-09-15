const fs = require("fs");
const path = require("path");

const Image = require("../models/Image");

exports.uploadImage = async (req, res) => {
    try {
        const { title, description } = req.body;

        if (!req.file) {
            return res.status(400).json({ msg: "No image uploaded" });
        }

        const image = new Image({
            title,
            description,
            filename: req.file.filename
        });
        console.log(req.filename);

        await image.save();
        res.json(image);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getImages = async (req, res) => {
    try {
        const images = await Image.find().sort({ createdAt: -1 });
        res.json(images);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};


exports.getImageById = async (req, res, next) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) {
            return res.status(404).json({ mssage: "Image not found" })
        }
        res.json(image)

    } catch (err) {
        next(err)
    }
}

exports.updateImageById = async (req, res, next) => {
    try {
        const image = await Image.findById(req.params.id);
        if (!image) return res.status(404).json({ message: "Image not found" })

        //Agar nayi file upload hui hai
        if (req.file) {
            //purani file delete karo
            const oldPath = path.join(__dirname, "..", "uploads", image.filename);
            fs.unlinkSync(oldPath)

            // nayi file assign karo
            image.filename = req.file.filename
        }

        // text fields update

        image.title = req.body.title || image.title;
        image.description = req.body.description || image.description

        await image.save()
        res.json({ message: "Image updated successfuly", image })
    } catch (err) {
        next(err)
    }
}
exports.deleteImage = async (req, res, next) => {
    try {
        const deleteImage = await Image.findById(req.params.id);
        if (!deleteImage) return res.status(404).json({ message: "Image not found" })

        // DB se bhi delete karo
        await Image.findByIdAndDelete(req.params.id)

        // uploadas folder se bhi file delete karo
        const filePath = path.join(__dirname, "..", "uploads", deleteImage.filename);
        fs.unlinkSync(filePath)

        res.json({ message: "Image deleted successfully" })

    } catch (err) {
        next(err)
    }
}