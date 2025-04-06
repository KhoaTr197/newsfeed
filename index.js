const express = require("express")
const logger = require("./server/middlewares/logger")
require('dotenv').config({
  path: "config/.env.dev"
});
// --------------------------------------
const { HOST_NAME = "localhost", PORT = 8000 } = process.env;

const app = express()
const log = logger()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

// START - TEST
const services = require("./server/services/test")

services.getData()
// END - TEST

app.listen(PORT, () => {
  log.master(`Server is running on http://${HOST_NAME}:${PORT}`)
})