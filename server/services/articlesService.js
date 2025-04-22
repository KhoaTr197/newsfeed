const connection = require('../db/database');
// ---------------------------------------------

// get all articles
const getAllArticles = async () => {
  try {
    const queryStr = "SELECT * FROM articles";
    const [data] = await connection.query(queryStr);
    return data;
  } catch (err) {
    throw err;
  }
};

// get specific article by id
const getArticleById = async (id) => {
  try {
    const queryStr = "SELECT * FROM articles WHERE id = ?";
    const [data] = await connection.query(queryStr, [id]);
    return data[0];
  } catch (err) {
    throw err;
  }
};

// get articles by user id
const getArticlesByUserId = async (userId) => {
  try {
    const queryStr = "SELECT * FROM articles WHERE userId = ?";
    const [data] = await connection.query(queryStr, [userId]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get articles by category id
const getArticlesByCategoryId = async (cateId) => {
  try {
    const queryStr = "SELECT * FROM articles WHERE cateId = ?";
    const [data] = await connection.query(queryStr, [cateId]);
    return data;
  } catch (err) {
    throw err;
  }
};

// search articles by title
const searchArticlesByTitle = async (title) => {
  try {
    const queryStr = "SELECT * FROM articles WHERE title LIKE ?";
    const [data] = await connection.query(queryStr, [`%${title}%`]);
    return data;
  } catch (err) {
    throw err;
  }
};

// add new aricle
const addArticle = async (title, content, thumbnail, publishedDate, userId, cateId, status) => {
  try {
    const queryStr = "INSERT INTO articles (title, content, thumbnail, publishedDate, userId, cateId, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await connection.query(queryStr, [title, content, thumbnail, publishedDate, userId, cateId, status]);
    return true;
  } catch (err) {
    throw err;
  }
};

// update article
const updateArticle = async (id, title, content, thumbnail, publishedDate, userId, cateId, status) => {
  try {
    const queryStr = "UPDATE articles SET title = ?, content = ?, thumbnail = ?, publishedDate = ?, userId = ?, cateId = ?, status = ? WHERE id = ?";
    await connection.query(queryStr, [title, content, thumbnail, publishedDate, userId, cateId, status, id]);
  } catch (err) {
    throw err;
  }
};

// delete article
const deleteArticle = async (id) => {
  try {
    const queryStr = "DELETE FROM articles WHERE id = ?";
    await connection.query(queryStr, [id]);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  getArticlesByUserId,
  getArticlesByCategoryId,
  searchArticlesByTitle,
  addArticle,
  updateArticle,
  deleteArticle
};