const articleService = require("../services/articlesService");
// ---------------------------------------------

// get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res.set("Content-Type", "application/json; charset=utf-8").json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get specific article by id
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleService.getArticleById(id);
    res.set("Content-Type", "application/json; charset=utf-8").json(article);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get comments by article id
const getCommentsByArticleId = async (req, res) => {
  try {
    const { id } = req.params;
    const comments = await articleService.getCommentsByArticleId(id);
    res.set("Content-Type", "application/json; charset=utf-8").json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get articles by user id
const getArticlesByUser_id = async (req, res) => {
  try {
    const { user_id } = req.params;
    const articles = await articleService.getArticlesByUser_id(user_id);
    res.set("Content-Type", "application/json; charset=utf-8").json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get articles by category id
const getArticlesByCategoryId = async (req, res) => {
  try {
    const { cate_id } = req.params;
    const articles = await articleService.getArticlesByCategoryId(cate_id);
    res.set("Content-Type", "application/json; charset=utf-8").json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// search articles by title
const searchArticlesByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const articles = await articleService.searchArticlesByTitle(title);
    res.set("Content-Type", "application/json; charset=utf-8").json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// add comment
const addComment = async (req, res) => {
  try {
    const { email, content, article_id, created_at } = req.body;
    await articleService.addComment(email, content, article_id, created_at);
    res.json({
      comment: { email, content, article_id, created_at },
      message: "Comment added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// add new aricle
const addArticle = async (req, res) => {
  try {
    const { title, content, published_date, user_id, cate_id, status } =
      req.body;
    const newArticle = await articleService.addArticle(
      title,
      content,
      published_date,
      user_id,
      cate_id,
      status
    );
    res.json({
      newArticle: newArticle,
      message: "Article added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update article
const updateArticle = async (req, res) => {
  try {
    const { id, title, content, published_date, user_id, cate_id, status } =
      req.body;
    await articleService.updateArticle(
      id,
      title,
      content,
      published_date,
      user_id,
      cate_id,
      status
    );
    res.json({ message: "Article updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// active article
const activeArticle = async (req, res) => {
  try {
    const { id } = req.body;
    await articleService.activeArticle(id);
    res.json({ message: "Article activated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// disable article
const disableArticle = async (req, res) => {
  try {
    const { id } = req.body;
    await articleService.disableArticle(id);
    res.json({ message: "Article disabled successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllArticles,
  getArticleById,
  getCommentsByArticleId,
  getArticlesByUser_id,
  getArticlesByCategoryId,
  searchArticlesByTitle,
  addArticle,
  addComment,
  updateArticle,
  activeArticle,
  disableArticle,
};
