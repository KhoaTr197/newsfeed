const express = require("express")
const logger = require("./server/middlewares/logger")
// --------------------------------------
const PORT = 3080
const app = express()
const log = logger()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  log.master(`Server is running on http://localhost:${PORT}`)
})