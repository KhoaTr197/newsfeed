const express = require("express");
const logger = require("./server/middlewares/logger");
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const path = require('path');
const routes = require("./server/routes");
require("dotenv").config({
  path: "config/.env.dev",
});
// ------------------------------------------------

const config = {
  server: {
    host: process.env.HOST_NAME || "localhost",
    port: process.env.PORT || 8000,
  },
  static: {
    setHeaders: (res, filePath) => {
      // Set proper MIME types for different file types
      if (filePath.endsWith(".css")) {
        res.setHeader("Content-Type", "text/css");
      } else if (filePath.endsWith(".js")) {
        res.setHeader("Content-Type", "application/javascript");
      } else if (filePath.endsWith(".woff2")) {
        res.setHeader("Content-Type", "font/woff2");
      } else if (filePath.endsWith(".woff")) {
        res.setHeader("Content-Type", "font/woff");
      } else if (filePath.endsWith(".ttf")) {
        res.setHeader("Content-Type", "font/ttf");
      } else if (filePath.endsWith(".avif")) {
        res.setHeader("Content-Type", "image/avif");
      } else if (filePath.endsWith(".png")) {
        res.setHeader("Content-Type", "image/png");
      } else if (filePath.endsWith(".jpg") || filePath.endsWith(".jpeg")) {
        res.setHeader("Content-Type", "image/jpeg");
      } else if (filePath.endsWith(".gif")) {
        res.setHeader("Content-Type", "image/gif");
      } else if (filePath.endsWith(".svg")) {
        res.setHeader("Content-Type", "image/svg+xml");
      }
    },
  },
};

const app = express();
const log = logger();

setupApp();

async function setupApp() {
  //use body parser
  app.use(bodyParser.urlencoded({ extended: true, charset: 'utf-8' }))
  app.use(bodyParser.json())

  // Set default charset
  app.use((req, res, next) => {
    res.charset = 'utf-8';
    next();
  })

  //use cookie parser
  app.use(cookieParser());

  //use activity logger to listen req, res
  app.use(log.activity());

  // Serve static files from the public directory
  app.use(
    express.static(
      path.join(__dirname, "server", "public"),
      config.server.static
    )
  );

  //apply routes
  app.use(routes);

  //set ejs as view engine
  app.set("view engine", "ejs");

  //set the views directory - updated path
  app.set("views", path.join(__dirname, "server", "views"));

  app.listen(config.server.port, () => {
    log.master(
      `Server is running on http://${config.server.host}:${config.server.port}`
    );
  });
}

// const compressor = require('./server/utils/ImageCompressor')();

// (async () => {
//   try {
//     const images = [
//       ['images/image_1.avif', 'images/thumbnail/thumb_1.jpeg'],
//       ['images/image_2.jpg', 'images/thumbnail/thumb_2.jpeg'],
//       ['images/image_3.jpg', 'images/thumbnail/thumb_3.jpeg'],
//       ['images/image_4.avif', 'images/thumbnail/thumb_4.jpeg'],
//       ['images/image_5.avif', 'images/thumbnail/thumb_5.jpeg'],
//       ['images/image_6.avif', 'images/thumbnail/thumb_6.jpeg'],
//     ]
//     images.forEach(async (image) => {
//       const [original, thumbnail] = image;
//       const result = await compressor.compressImage(`server/public/${original}`, `server/public/${thumbnail}`, 'jpeg');
//       console.log('Original image path:', result);
//     })
//   } catch (error) {
//     console.error('Error during processing:', error);
//   }
// })();
