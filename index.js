const express = require("express")
// --------------------------------------
const PORT = 3080
const app = express()

app.get("/", (req, res) => {
  res.send("Hello World!")
})

app.listen(PORT, () => {
  console.log(`[MASTER] Server is running on http://localhost:${PORT}`)
})