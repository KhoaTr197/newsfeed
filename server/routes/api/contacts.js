const router = require("express").Router();
const contactController = require("../../controllers/contactsController");

router.get("/", contactController.getAllContacts);

router.post("/", contactController.addContact);

router.patch("/status", contactController.updateContactStatus);

module.exports = router;
