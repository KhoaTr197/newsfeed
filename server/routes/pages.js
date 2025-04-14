const router = require('express').Router();
const path = require("path")

router.get(["/", "/index", "/homepage"], (req, res) => {
  res.render("index");
})

router.get("/me", (req, res) => {
  res.sendFile(path.join(__dirname, "../views", "index.html"))
})

module.exports = router;