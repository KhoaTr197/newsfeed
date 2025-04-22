const connection = require("../db/database");

//get
const getContacts = async () => {
  const queryStr = "SELECT * FROM contact";
  const [data] = await connection.query(queryStr);
  return data;
};

//add
const addContact = async (name, email, message) => {
  const queryStr =
    "INSERT INTO contact (name, email, message) VALUES (?, ?, ?)";
  const [result] = await connection.query(queryStr, [name, email, message]);
  return result.affectedRows > 0;
};

module.exports = {
  getContacts,
  addContact,
};
