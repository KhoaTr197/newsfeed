const router = require('express').Router();
const articleController = require('../../controllers/articlesController');
// -----------------------------------

router.get("/", articleController.getAllArticles)

router.get("/:id", articleController.getArticleById)

router.get("/user/:user_id", articleController.getArticlesByUser_id)

router.get("/category/:cate_id", articleController.getArticlesByCategoryId)

router.get("/search/:title", articleController.searchArticlesByTitle)

router.post("/", articleController.addArticle)

router.put("/", articleController.updateArticle)

router.put("/active", articleController.activeArticle)

router.delete("/", articleController.disableArticle)

module.exports = router;