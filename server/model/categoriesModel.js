const connection = require("../db/database");

const getCategories = async () => {
  const queryStr = "SELECT * FROM categories";
  const [data] = await connection.query(queryStr);
  return data;
};

const updateCategory = async (id, name, status) => {
  const queryStr = `UPDATE categories SET cateName = ?, status = ? WHERE id = ?`;
  const [result] = await connection.query(queryStr, [name, status, id]);
  return result.affectedRows > 0;
};

const addCategory = async (name, status) => {
  const queryStr = `INSERT INTO categories (cateName, status) VALUES (?, ?)`;
  const [result] = await connection.query(queryStr, [name, status]);
  return result.affectedRows > 0;
};

module.exports = {
  getCategories,
  updateCategory,
  addCategory,
};
