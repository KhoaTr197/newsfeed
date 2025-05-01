const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

class ImageCompressor {
  constructor(options = {}) {
    this.quality = options.quality || 80;
    this.thumbnailWidth = options.thumbnailWidth || 300;
    this.thumbnailHeight = options.thumbnailHeight || 200;

    this.ensureDirectoriesExist();
  }
  ensureDirectoriesExist() {
    const dirs = [
      path.join(__dirname, '..', 'public', 'images'),
      path.join(__dirname, '..', 'public', 'images', 'thumbnail')
    ];

    dirs.forEach(dir => {
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
    });
  }
  async processImage(input, id, options = {}) {
    try {
      // Create paths
      const originalPath = path.join(__dirname, '..', 'public', 'images', `image_${id}.avif`);
      const thumbnailPath = path.join(__dirname, '..', 'public', 'images', 'thumbnail', `thumb_${id}.jpeg`);

      // Process original image (AVIF format)
      await this.saveAsAvif(input, originalPath, options);

      // Create and save thumbnail (JPEG format)
      await this.createThumbnail(input, thumbnailPath, options);

      return {
        originalPath: `images/image_${id}.avif`,
        thumbnailPath: `images/thumbnail/thumb_${id}.jpeg`
      };
    } catch (error) {
      console.error('Error processing image:', error);
      throw error;
    }
  }
  async saveAsAvif(input, outputPath, options = {}) {
    const width = options.width || null; // null means maintain aspect ratio

    await sharp(input)
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .avif({
        quality: options.quality || this.quality,
        effort: 7 // Higher effort = better compression but slower
      })
      .toFile(outputPath);
  }
  async createThumbnail(input, outputPath, options = {}) {
    const width = options.thumbnailWidth || this.thumbnailWidth;
    const height = options.thumbnailHeight || this.thumbnailHeight;

    await sharp(input)
      .resize(width, height, {
        fit: 'cover', // Cover ensures the thumbnail is filled
        position: 'center'
      })
      .jpeg({
        quality: options.quality || this.quality,
        mozjpeg: true // Use mozjpeg for better compression
      })
      .toFile(outputPath);
  }
  async convertToJpeg(input, outputPath, options = {}) {
    const width = options.width || null;

    await sharp(input)
      .resize(width, null, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .jpeg({
        quality: options.quality || this.quality,
        mozjpeg: true
      })
      .toFile(outputPath);
  }
  async getMetadata(input) {
    return await sharp(input).metadata();
  }
  async optimizeImage(input, outputPath, options = {}) {
    const metadata = await this.getMetadata(input);
    const width = options.width || metadata.width;

    let sharpInstance = sharp(input).resize(width, null, {
      fit: 'inside',
      withoutEnlargement: true
    });

    // Determine output format based on input
    const format = metadata.format;

    switch (format.toLowerCase()) {
      case 'jpeg':
      case 'jpg':
        sharpInstance = sharpInstance.jpeg({
          quality: options.quality || this.quality,
          mozjpeg: true
        });
        break;
      case 'png':
        sharpInstance = sharpInstance.png({
          compressionLevel: 9,
          palette: true
        });
        break;
      case 'webp':
        sharpInstance = sharpInstance.webp({
          quality: options.quality || this.quality
        });
        break;
      case 'avif':
        sharpInstance = sharpInstance.avif({
          quality: options.quality || this.quality,
          effort: 7
        });
        break;
      default:
        // For other formats, convert to JPEG
        sharpInstance = sharpInstance.jpeg({
          quality: options.quality || this.quality,
          mozjpeg: true
        });
    }

    await sharpInstance.toFile(outputPath);
  }
}

module.exports = ImageCompressor;