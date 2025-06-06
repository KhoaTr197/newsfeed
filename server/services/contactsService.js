const connection = require("../db/database");

//get
const getAllContacts = async () => {
  const queryStr = "SELECT * FROM contact ORDER BY created_at DESC";
  const [data] = await connection.query(queryStr);
  return data;
};

//add
const addContact = async (name, email, phone, title, content) => {
  const queryStr =
    "INSERT INTO contact (name, email, phone, title, content, status) VALUES (?, ?, ?, ?, ?, 'pending')";
  const [result] = await connection.query(queryStr, [
    name,
    email,
    phone,
    title,
    content,
  ]);
  return result.affectedRows > 0;
};

const updateContactStatus = async (status, id) => {
  const queryStr = "UPDATE contact SET status = ? WHERE id = ?";
  const [result] = await connection.query(queryStr, [status, id]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllContacts,
  addContact,
  updateContactStatus,
};
