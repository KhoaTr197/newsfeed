const contactService = require("../services/contactsService");

const getAllContacts = async (req, res) => {
  try {
    const contact = await contactService.getAllContacts();
    res.set("Content-Type", "application/json; charset=utf-8").json(contact);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const addContact = async (req, res) => {
  try {
    const { name, email, tel, title, message } = req.body;
    const result = await contactService.addContact(
      name,
      email,
      tel,
      title,
      message
    );
    res.status(200).json({
      success: true,
      message: "Message sent successfully!",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateContactStatus = async (req, res) => {
  try {
    const { status, id } = req.body;
    console.log(status);
    console.log(id);

    const validStatuses = ["pending", "in_progress", "resolved", "rejected"];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({ error: "Invalid status value" });
    }

    const result = await contactService.updateContactStatus(status, id);

    res.status(200).json({
      success: true,
      message: "Status updated successfully",
      data: result,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllContacts,
  addContact,
  updateContactStatus,
};
