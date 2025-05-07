const sharp = require('sharp');

class ImageCompressor {
  constructor(config = null) {
    this.config = config || {
      quality: 80,
      maxWidth: 300,
      maxHeight: 200
    };
  }
  async compressImage(filePath, outputPath, newFormat) {
    try {
      await sharp(filePath)
        .resize(this.config.maxWidth, this.config.maxHeight, {
          fit: 'cover',
          position: 'center'
        })
        [newFormat]({
          quality: this.config.quality,
          effort: 7
        })
        .toFile(outputPath);

      return outputPath;
    } catch {
      throw new Error('Failed to compress image');
    }
  }
}

const compressor = () => {
  return new ImageCompressor();
}

module.exports = compressor;