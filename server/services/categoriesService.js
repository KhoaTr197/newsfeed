const connection = require("../db/database");
// ---------------------------------------------

// get all categories
const getAllCategories = async () => {
  try {
    const queryStr = "SELECT * FROM categories";
    const [data] = await connection.query(queryStr);
    return data;
  } catch (err) {
    throw err;
  }
};

// add category
const addCategory = async (name, status) => {
  try {
    const queryStr = "INSERT INTO categories (cateName, status) VALUES (?, ?)";
    await connection.query(queryStr, [name, status]);
  } catch (err) {
    throw err;
  }
};

// update category
const updateCategory = async (id, name, status) => {
  try {
    const queryStr = "UPDATE categories SET cateName = ?, status = ? WHERE id = ?";
    await connection.query(queryStr, [name, status, id]);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllCategories,
  updateCategory,
  addCategory,
};
