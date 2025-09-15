const express = require("express");
const router = express.Router();
const upload = require("../utils/multer");
const imageController = require("../controllers/imageController");

router.post("/upload", upload.single("image"), imageController.uploadImage);
router.get("/", imageController.getImages);
router.get('/:id', imageController.getImageById)
router.put('/:id', upload.single("image"), imageController.updateImageById)
router.delete('/:id', imageController.deleteImage)

module.exports = router
