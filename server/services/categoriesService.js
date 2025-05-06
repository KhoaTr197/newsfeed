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

const countArticlesByCategory = async () => {
  try {
    const queryStr = `
      SELECT cate_id, COUNT(*) as count
      FROM articles
      WHERE status = 1
      GROUP BY cate_id
    `;
    const [data] = await connection.query(queryStr);
    return data;
  } catch (err) {
    throw err;
  }
};

// get featured categories
const getFeaturedCategories = async (limit) => {
  try {
    const queryStr = `
      SELECT *
      FROM categories
      WHERE is_featured = 1 AND status = 1
      LIMIT ?
    `;
    const [data] = await connection.query(queryStr, [limit]);
    return data;
  } catch (err) {
    throw err;
  }
}

// add category
const addCategory = async (name, status) => {
  try {
    const queryStr = "INSERT INTO categories (cate_name, status) VALUES (?, ?)";
    await connection.query(queryStr, [name, status]);
  } catch (err) {
    throw err;
  }
};

// update category
const updateCategory = async (id, name) => {
  try {
    const queryStr = "UPDATE categories SET cate_name = ? WHERE id = ?";
    await connection.query(queryStr, [name, id]);
  } catch (err) {
    throw err;
  }
};

// active category
const activeCategory = async (id) => {
  try {
    const categoryQuery = "UPDATE categories SET status = 1 WHERE id = ?";
    const articleQuery = "UPDATE articles SET status = 1 WHERE cate_id = ?";

    const [data] = await connection.query(categoryQuery, [id]);
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
    const articleQuery = "UPDATE articles SET status = 0 WHERE cate_id = ?";

    const [data] = await connection.query(categoryQuery, [id]);
    if (data.affectedRows != 0) {
      await connection.query(articleQuery, [id]);
    }

  } catch (err) {
    throw err;
  }
};

// get category by id
const getCategoryById = async (id) => {
  try {
    const queryStr = "SELECT * FROM categories WHERE id = ? AND status = 1";
    const [data] = await connection.query(queryStr, [id]);
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllCategories,
  getAllActiveCategories,
  countArticlesByCategory,
  getFeaturedCategories,
  updateCategory,
  addCategory,
  activeCategory,
  disableCategory,
  getCategoryById,
};
