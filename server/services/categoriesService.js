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

const getAllActiveCategories = async () => {
  try {
    const queryStr = "SELECT * FROM categories WHERE status = 1";
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
const updateCategory = async (id, name) => {
  try {
    const queryStr = "UPDATE categories SET cateName = ? WHERE id = ?";
    await connection.query(queryStr, [name, id]);
  } catch (err) {
    throw err;
  }
};

// active category
const activeCategory = async (id) => {
  try {
    const categoryQuery = "UPDATE categories SET status = 1 WHERE id = ?";
    const articleQuery = "UPDATE articles SET status = 1 WHERE cateId = ?";

    const [data] = await connection.query(categoryQuery, [id]);
    console.log(data.affectedRows)
    if (data.affectedRows != 0) {
      await connection.query(articleQuery, [id]);  
    }

  } catch (err) {
    throw err;
  }
};

// disable category
const disableCategory = async (id) => {
  try {
    const categoryQuery = "UPDATE categories SET status = 0 WHERE id = ?";
    const articleQuery = "UPDATE articles SET status = 0 WHERE cateId = ?";

    const [data] = await connection.query(categoryQuery, [id]);
    if (data.affectedRows != 0) {
      await connection.query(articleQuery, [id]);  
    }
    
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllCategories,
  getAllActiveCategories,
  updateCategory,
  addCategory,
  activeCategory,
  disableCategory,
};
