const connection = require("../db/database");

//get
const getAllContacts = async () => {
  const queryStr = "SELECT * FROM contact";
  const [data] = await connection.query(queryStr);
  return data;
};

//add
const addContact = async (name, email, phone, title, content) => {
  const queryStr =
    "INSERT INTO contact (name, email, phone, title, content) VALUES (?, ?, ?, ?,)";
  const [result] = await connection.query(queryStr, [
    name,
    email,
    phone,
    title,
    content,
  ]);
  return result.affectedRows > 0;
};

module.exports = {
  getAllContacts,
  addContact,
};
