const contactService = require("../services/contactsService");

const getAllContacts = async (req, res) => {
  try {
    const contact = await contactService.getAllContacts();
    res
      .set('Content-Type', 'application/json; charset=utf-8')
      .json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    await contactService.addContact(name, email, message);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  addContact,
};
