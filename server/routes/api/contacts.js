const router = require("express").Router();
const contactController = require("../../controllers/contactsController");

router.get("/", contactController.getAllContacts);

router.post("/", contactController.addContact);

module.exports = router;
