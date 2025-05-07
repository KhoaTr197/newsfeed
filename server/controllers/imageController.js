const imageService = require("../services/imageService");
const compressor = require('../utils/ImageCompressor')();
const path = require('path');
// ----------------------------------------------------

// Upload image
const uploadImage = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: 'No id provided' });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the file extension
    const fileExtension = path.extname(req.file.originalname);
    const [originalFilePath, thumbnailFilePath] = [`images/image_${id}${fileExtension}`, `images/thumbnail/thumb_${id}.jpeg`];

    await compressor.compressImage(`server/public/${originalFilePath}`, `server/public/${thumbnailFilePath}`, 'jpeg');

    await imageService.uploadImage(id, [originalFilePath, thumbnailFilePath]);

    res.json({
      message: 'Image uploaded successfully',
    });
  } catch (err) {
    console.error('Error in uploadImage:', err);
    res.status(500).json({ error: err.message });
  }
};

const updateImage = async (req, res) => {
  try {
    const { id } = req.body;

    // Check if ID is provided
    if (!id) {
      return res.status(400).json({ error: 'No id provided' });
    }

    // Check if file was uploaded
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Get the file extension
    const fileExtension = path.extname(req.file.originalname);
    const [originalFilePath, thumbnailFilePath] = [`images/image_${id}${fileExtension}`, `images/thumbnail/thumb_${id}.jpeg`];

    await compressor.compressImage(`server/public/${originalFilePath}`, `server/public/${thumbnailFilePath}`, 'jpeg');

    await imageService.uploadImage(id, [originalFilePath, thumbnailFilePath]);

    res.json({
      message: 'Image updated successfully',
    });
  } catch (err) {
    console.error('Error in updateImage:', err);
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  uploadImage,
  updateImage,
};
