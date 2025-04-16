const express = require("express");
const logger = require("./server/middlewares/logger");
const path = require('path');
const routes = require("./server/routes");
require('dotenv').config({
  path: "config/.env.dev"
});
// ------------------------------------------------

const config = {
  server: {
    host: process.env.HOST_NAME || "localhost",
    port: process.env.PORT || 8000
  },
  static: {
    setHeaders: (res, filePath) => {
      // Set proper MIME types for different file types
      if (filePath.endsWith('.css')) {
        res.setHeader('Content-Type', 'text/css');
      } else if (filePath.endsWith('.js')) {
        res.setHeader('Content-Type', 'application/javascript');
      } else if (filePath.endsWith('.woff2')) {
        res.setHeader('Content-Type', 'font/woff2');
      } else if (filePath.endsWith('.woff')) {
        res.setHeader('Content-Type', 'font/woff');
      } else if (filePath.endsWith('.ttf')) {
        res.setHeader('Content-Type', 'font/ttf');
      } else if (filePath.endsWith('.png')) {
        res.setHeader('Content-Type', 'image/png');
      } else if (filePath.endsWith('.jpg') || filePath.endsWith('.jpeg')) {
        res.setHeader('Content-Type', 'image/jpeg');
      } else if (filePath.endsWith('.gif')) {
        res.setHeader('Content-Type', 'image/gif');
      } else if (filePath.endsWith('.svg')) {
        res.setHeader('Content-Type', 'image/svg+xml');
      }
    }
  }
};

const app = express()
const log = logger()

setupApp();

async function setupApp() {
  //use activity logger to listen req, res
  app.use(log.activity());

  // Serve static files from the public directory
  app.use(express.static(path.join(__dirname, 'server', 'public'), config.server.static));

  //apply routes
  app.use(routes);

  //set ejs as view engine
  app.set('view engine', 'ejs');

  //set the views directory - updated path
  app.set('views', path.join(__dirname, 'server', 'views'));

  app.get('*', (req, res) => {
    res.status(404).send();
  });

  app.listen(config.server.port, () => {
    log.master(`Server is running on http://${config.server.host}:${config.server.port}`)
  })
}