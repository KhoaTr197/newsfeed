const router = require("express").Router();
const path = require("path");
const categoryController = require("../controllers/categoryController");
const contactController = require("../controllers/contactController");

router.get(["/", "/index", "/homepage"], (req, res) => {
  res.render("index");
});

router.get("/admin", async (req, res) => {
  const categories = await categoryController.getCategories();
  const contacts = await contactController.getContacts();
  res.render("admin", {
    categories,
    contacts,
  });
});

router.get("/contact", (req, res) => {
  res.render("contact");
});
module.exports = router;
