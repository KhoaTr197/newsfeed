const contactService = require("../services/contactService");

const getContacts = async (req, res) => {
  try {
    const contact = await contactService.getContacts();
    return contact;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const addContact = async (req, res) => {
  try {
    console.log(req.body);
    // const { name, status } = req.body;
    // const success = await contactService.addContact(name, status);
    // if (success) {
    //   res.json({ message: "Contact added successfully" });
    // } else {
    //   res.status(404).json({ error: "Failed to add contact" });
    // }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getContacts,
  addContact,
};
