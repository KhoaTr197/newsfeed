const connection = require("../db/database");
// ---------------------------------------------

// get all articles
const getAllArticles = async () => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
      ORDER BY articles.id ASC
    `;
    const [data] = await connection.query(queryStr);
    return data;
  } catch (err) {
    throw err;
  }
};

const getAllActiveArticles = async (cate_ids, limit) => {
  try {
    let whereClause = "articles.status = 1";
    let limitClause = limit ? `LIMIT ${limit}` : "";

    if (cate_ids && cate_ids.length > 0) {
      whereClause += ` AND articles.cate_id IN (${cate_ids.join(",")})`;
    }

    const queryStr = `
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
      WHERE ${whereClause}
      ${limitClause}
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
      WHERE articles.user_id = ?
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
const searchArticlesByKeyword = async (
  keyword,
  page,
  limit,
  category,
  sort = "newest"
) => {
  try {
    // Build the WHERE clause
    let whereClause = keyword
      ? `AND articles.title LIKE '%${keyword}%' OR articles.content LIKE '%${keyword}%'`
      : "";

    // Add category filter if provided
    whereClause += category
      ? `AND articles.cate_id = ${parseInt(category)}`
      : "";

    // Determine sort order
    let orderBy;
    switch (sort) {
      case "oldest":
        orderBy = "articles.published_date ASC";
        break;
      case "newest":
      default:
        orderBy = "articles.published_date DESC";
        break;
    }

    // Count query
    const countQueryStr = `
      SELECT COUNT(*) as resultCount
      FROM articles
      WHERE articles.status = 1 ${whereClause}
    `;

    const [countData] = await connection.query(countQueryStr);

    // Main query with pagination
    const offset = (page - 1) * limit;
    const queryStr = `
      SELECT articles.*, categories.cate_name, users.username
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      JOIN users ON articles.user_id = users.id
      WHERE articles.status = 1 AND categories.status = 1 ${whereClause}
      ORDER BY ${orderBy}
      LIMIT ? OFFSET ?
    `;

    const [articles] = await connection.query(queryStr, [
      parseInt(limit),
      parseInt(offset),
    ]);

    return [articles, countData[0].resultCount];
  } catch (error) {
    throw error;
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
      WHERE articles.id != ? and (articles.title LIKE ? or articles.user_id = ? or articles.cate_id = ?) and articles.status = 1 AND categories.status = 1
      LIMIT ?
    `;
    const [data] = await connection.query(queryStr, [
      id,
      `%${title}%`,
      user_id,
      cate_id,
      limit,
    ]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get latest articles
const getLatestArticles = async (limit) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cate_name
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      WHERE articles.status = 1 AND categories.status = 1
      ORDER BY published_date DESC
      LIMIT ?
    `;
    const [data] = await connection.query(queryStr, [limit]);
    return data;
  } catch (err) {
    throw err;
  }
};

// get most viewed articles
const getMostViewedArticles = async (limit) => {
  try {
    const queryStr = `
      SELECT articles.*, categories.cate_name
      FROM articles
      JOIN categories ON articles.cate_id = categories.id
      WHERE articles.status = 1 AND categories.status = 1
      ORDER BY views DESC
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
const addArticle = async (title, content, user_id, cate_id, status) => {
  try {
    const queryStr =
      "INSERT INTO articles (title, content, user_id, cate_id, status) VALUES (?, ?, ?, ?, ?)";
    const [result] = await connection.query(queryStr, [
      title,
      content,
      user_id,
      cate_id,
      status,
    ]);
    return {
      id: result.insertId,
      title,
      content,
      user_id,
      cate_id,
      status,
    }; // Return newly inserted article
  } catch (err) {
    console.error("Error in articlesService.addArticle:", err);
    throw err;
  }
};

// add comment
const addComment = async (email, content, article_id, created_at) => {
  try {
    const queryStr =
      "INSERT INTO comments (email, content, article_id, created_at) VALUES (?, ?, ?, ?)";
    await connection.query(queryStr, [email, content, article_id, created_at]);
    return true;
  } catch (err) {
    throw err;
  }
};

// update article
const updateArticle = async (id, title, content, user_id, cate_id, status) => {
  try {
    const queryStr =
      "UPDATE articles SET title = ?, content = ?, user_id = ?, cate_id = ?, status = ? WHERE id = ?";
    await connection.query(queryStr, [
      title,
      content,
      user_id,
      cate_id,
      status,
      id,
    ]);
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
  getMostViewedArticles,
  addArticle,
  addComment,
  updateArticle,
  activeArticle,
  disableArticle,
};
