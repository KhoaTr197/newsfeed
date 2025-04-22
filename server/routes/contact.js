const router = require("express").Router();
const contactController = require("../controllers/contactController");

router.post("/api/contact", contactController.addContact);

module.exports = router;
