const router = require("express").Router();
const multer = require('multer');
const path = require('path');
const imageController = require("../../controllers/imageController");
// -----------------------------------

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '..', '..', 'public', 'images'));
  },
  filename: function (req, file, cb) {
    const id = req.body.id; // Access the ID from req.body
    if (!id) {
      return cb(new Error('No id provided'), false);
    }
    const ext = path.extname(file.originalname);
    cb(null, `image_${id}${ext}`);
  }
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|avif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
});

router.post("/", upload.single('image'), imageController.uploadImage);

router.put("/", upload.single('image'), imageController.updateImage);

module.exports = router;
