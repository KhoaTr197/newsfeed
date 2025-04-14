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
  }
};

const app = express()
const log = logger()

setupApp();

// START - TEST
const services = require("./server/services/test")
services.getData()
// END - TEST

async function setupApp() {
  //use activity logger to listen req, res
  app.use(log.activity());

  // Serve static files from the public directory
  app.use(express.static(path.join(__dirname, 'server', 'public')));

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