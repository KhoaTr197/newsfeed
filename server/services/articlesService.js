const connection = require('../db/database');
// ---------------------------------------------

// get all articles
const getAllArticles = async () => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
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
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
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
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
      WHERE articles.id = ? and articles.status = 1
    `;
    const [data] = await connection.query(queryStr, [id]);
    return data[0];
  } catch (err) {
    throw err;
  }
};

// get articles by user id
const getArticlesByUser_id = async (user_id) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
      WHERE articles.user_id = ? and articles.status = 1
    `;
    const [data] = await connection.query(queryStr, [user_id]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get articles by category id
const getArticlesByCategoryId = async (cate_id) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
      WHERE articles.cate_id = ? and articles.status = 1
    `;
    const [data] = await connection.query(queryStr, [cate_id]);
    return data;
  } catch (err) {
    throw err;
  }
};

// search articles by keyword
const searchArticlesByKeyword = async (keyword) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
      WHERE articles.title LIKE ? or articles.content LIKE ? and articles.status = 1
    `;
    const [data] = await connection.query(queryStr, [`%${keyword}%`, `%${keyword}%`]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get related articles based on a specific article
const getRelatedArticles = async (article, limit) => {
  const { id, title, user_id, cate_id } = article;
  try {
    const queryStr = `
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
      WHERE articles.id != ? and (articles.title LIKE ? or articles.user_id = ? or articles.cate_id = ?) and articles.status = 1
      LIMIT ?
    `;
    const [data] = await connection.query(queryStr, [id, `%${title}%`, user_id, cate_id, limit]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get latest articles
const getLatestArticles = async (limit) => {
  try {
    const queryStr = `
      SELECT id, title, thumbnail, published_date
      FROM articles
      WHERE status = 1
      ORDER BY published_date DESC
      LIMIT ?
    `;
    const [data] = await connection.query(queryStr, [limit]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get comments by article id
const getCommentsByArticleId = async (id) => {
  try {
    const queryStr = `
      SELECT *
      FROM comments
      WHERE article_id = ?
    `;
    const [data] = await connection.query(queryStr, [id]);
    return data;
  } catch (err) {
    throw err;
  }
};

// add new aricle
const addArticle = async (title, content, thumbnail, publishedDate, user_id, cate_id, status) => {
  try {
    const queryStr = "INSERT INTO articles (title, content, thumbnail, publishedDate, user_id, cate_id, status) VALUES (?, ?, ?, ?, ?, ?, ?)";
    await connection.query(queryStr, [title, content, thumbnail, publishedDate, user_id, cate_id, status]);
    return true;
  } catch (err) {
    throw err;
  }
};

// add comment
const addComment = async (email, content, article_id, created_at) => {
  try {
    const queryStr = "INSERT INTO comments (email, content, article_id, created_at) VALUES (?, ?, ?, ?)";
    await connection.query(queryStr, [email, content, article_id, created_at]);
    return true;
  } catch (err) {
    throw err;
  }
};

// update article
const updateArticle = async (id, title, content, thumbnail, publishedDate, user_id, cate_id, status) => {
  try {
    const queryStr = "UPDATE articles SET title = ?, content = ?, thumbnail = ?, publishedDate = ?, user_id = ?, cate_id = ?, status = ? WHERE id = ?";
    await connection.query(queryStr, [title, content, thumbnail, publishedDate, user_id, cate_id, status, id]);
  } catch (err) {
    throw err;
  }
};

// active article
const activeArticle = async (id) => {
  try {
    const queryStr = "UPDATE articles SET status = 1 WHERE id = ?";
    await connection.query(queryStr, [id]);
  } catch (err) {
    throw err;
  }
};

// disable article
const disableArticle = async (id) => {
  try {
    const queryStr = "UPDATE articles SET status = 0 WHERE id = ?";
    await connection.query(queryStr, [id]);
  } catch (err) {
    throw err;
  }
};


module.exports = {
  getAllArticles,
  getAllActiveArticles,
  getArticleById,
  getCommentsByArticleId,
  getArticlesByUser_id,
  getArticlesByCategoryId,
  searchArticlesByKeyword,
  getRelatedArticles,
  getLatestArticles,
  addArticle,
  addComment,
  updateArticle,
  activeArticle,
  disableArticle,
};