const router = require('express').Router();
const articleController = require('../../controllers/articlesController');
// -----------------------------------

router.get("/", articleController.getAllArticles)

router.get("/:id", articleController.getArticleById)

router.get("/user/:userId", articleController.getArticlesByUserId)

router.get("/category/:cateId", articleController.getArticlesByCategoryId)

router.get("/search/:title", articleController.searchArticlesByTitle)

router.post("/", articleController.addArticle)

router.put("/", articleController.updateArticle)

router.delete("/", articleController.deleteArticle)

module.exports = router;