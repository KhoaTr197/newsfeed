const express = require("express")
const logger = require("./server/middlewares/logger")
const routes = require("./server/routes")
require('dotenv').config({
  path: "config/.env.dev"
});

const config = {
  server: {
    host: process.env.HOST_NAME || "localhost",
    port: process.env.PORT || 8000
  }
};

const app = express()
const log = logger()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.get("/me", (req, res) => {
  res.send("Hello Me!")
})

// Apply routes
app.use(routes);

// START - TEST
const services = require("./server/services/test")
services.getData()
// END - TEST

app.get('*', (req, res) => {
  res.status(404).send();
});

app.listen(config.server.port, () => {
  log.master(`Server is running on http://${config.server.host}:${config.server.port}`)
})