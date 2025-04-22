const router = require('express').Router();
const auth = require('../middlewares/authMiddleware');
// -----------------------------------

router.get(["/", "/index", "/homepage"], (req, res) => {
  res.render("index");
});

router.get("/contact", (req, res) => {
  res.render("contact");
})

router.get("/login", (req, res) => {
  res.render("login");
})

router.get("/signup", (req, res) => {
  res.render("signup");
})

// protected routes (route need to be authenticated, role checked before access)
router.get("/admin", auth.verifyToken("/login"), auth.checkRole(['admin']), (req, res) => {
  res.render("admin");
})

router.get("/author", auth.verifyToken("/login"), auth.checkRole(['author']), (req, res) => {
  res.render("author");
})

// 404 route
router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
