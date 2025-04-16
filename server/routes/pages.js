const router = require('express').Router();
const path = require("path")

router.get(["/", "/index", "/homepage"], (req, res) => {
  res.render("index");
})

router.get("/admin", (req, res) => {
  res.render("admin");
})

module.exports = router;