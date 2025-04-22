const articleService = require('../services/articlesService');
// ---------------------------------------------

// get all articles
const getAllArticles = async (req, res) => {
  try {
    const articles = await articleService.getAllArticles();
    res
      .set('Content-Type', 'application/json; charset=utf-8')
      .json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get specific article by id
const getArticleById = async (req, res) => {
  try {
    const { id } = req.params;
    const article = await articleService.getArticleById(id);
    res
      .set('Content-Type', 'application/json; charset=utf-8')
      .json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// get articles by user id
const getArticlesByUserId = async (req, res) => {
  try {
    const { userId } = req.params;
    const articles = await articleService.getArticlesByUserId(userId);
    res
      .set('Content-Type', 'application/json; charset=utf-8')
      .json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// get articles by category id
const getArticlesByCategoryId = async (req, res) => {
  try {
    const { cateId } = req.params;
    const articles = await articleService.getArticlesByCategoryId(cateId);
    res
      .set('Content-Type', 'application/json; charset=utf-8')
      .json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// search articles by title
const searchArticlesByTitle = async (req, res) => {
  try {
    const { title } = req.params;
    const articles = await articleService.searchArticlesByTitle(title);
    res
      .set('Content-Type', 'application/json; charset=utf-8')
      .json(articles);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// add new aricle
const addArticle = async (req, res) => {
  try {
    const { title, content, thumbnail, publishedDate, userId, cateId, status } = req.body;
    await articleService.addArticle(title, content, thumbnail, publishedDate, userId, cateId, status);
    res.json({ message: 'Article added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// update article
const updateArticle = async (req, res) => {
  try {
    const { id, title, content, thumbnail, publishedDate, userId, cateId, status } = req.body;
    await articleService.updateArticle(id, title, content, thumbnail, publishedDate, userId, cateId, status);
    res.json({ message: 'Article updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

// delete article
const deleteArticle = async (req, res) => {
  try {
    const { id } = req.body;
    await articleService.deleteArticle(id);
    res.json({ message: 'Article deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
}

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