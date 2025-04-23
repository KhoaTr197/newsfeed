const connection = require('../db/database');
// ---------------------------------------------

// get all articles
const getAllArticles = async () => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cateName, users.username
      FROM articles
      JOIN categories ON articles.cateId = categories.id
      JOIN users ON articles.userId = users.id
    `;
    const [data] = await connection.query(queryStr);
    return data;
  } catch (err) {
    throw err;
  }
};

const getAllActiveArticles = async () => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cateName, users.username
      FROM articles
      JOIN categories ON articles.cateId = categories.id
      JOIN users ON articles.userId = users.id
      WHERE articles.status = 1
    `;
    const [data] = await connection.query(queryStr);
    return data;
  } catch (err) {
    throw err;
  }
};

// get specific article by id
const getArticleById = async (id) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cateName, users.username
      FROM articles
      JOIN categories ON articles.cateId = categories.id
      JOIN users ON articles.userId = users.id
      WHERE articles.id = ? and articles.status = 1
    `;
    const [data] = await connection.query(queryStr, [id]);
    return data[0];
  } catch (err) {
    throw err;
  }
};

// get articles by user id
const getArticlesByUserId = async (userId) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cateName, users.username
      FROM articles
      JOIN categories ON articles.cateId = categories.id
      JOIN users ON articles.userId = users.id
      WHERE articles.userId = ? and articles.status = 1
    `;
    const [data] = await connection.query(queryStr, [userId]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get articles by category id
const getArticlesByCategoryId = async (cateId) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cateName, users.username
      FROM articles
      JOIN categories ON articles.cateId = categories.id
      JOIN users ON articles.userId = users.id
      WHERE articles.cateId = ? and articles.status = 1
    `;
    const [data] = await connection.query(queryStr, [cateId]);
    return data;
  } catch (err) {
    throw err;
  }
};

// search articles by title
const searchArticlesByTitle = async (title) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cateName, users.username
      FROM articles
      JOIN categories ON articles.cateId = categories.id
      JOIN users ON articles.userId = users.id
      WHERE articles.title LIKE ? and articles.status = 1
    `;
    const [data] = await connection.query(queryStr, [`%${title}%`]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get related articles based on a specific article
const getRelatedArticles = async (article, limit) => {
  const { id, title, userId, cateId } = article;
  try {
    const queryStr = `
      SELECT articles.*, categories.cateName, users.username
      FROM articles
      JOIN categories ON articles.cateId = categories.id
      JOIN users ON articles.userId = users.id
      WHERE articles.id != ? and (articles.title LIKE ? or articles.userId = ? or articles.cateId = ?) and articles.status = 1
      LIMIT ?
    `;
    const [data] = await connection.query(queryStr, [id, `%${title}%`, userId, cateId, limit]);
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
  getAllActiveArticles,
  getArticleById,
  getArticlesByUserId,
  getArticlesByCategoryId,
  searchArticlesByTitle,
  getRelatedArticles,
  addArticle,
  updateArticle,
  deleteArticle
};