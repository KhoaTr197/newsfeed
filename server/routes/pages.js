const router = require('express').Router();
const categoriesService = require('../services/categoriesService');
const articlesService = require('../services/articlesService');
const auth = require('../middlewares/authMiddleware');
// -----------------------------------

router.get(["/", "/index", "/homepage"], async (req, res) => {
  try {
    const [allCategories, allArticles] = [
      await categoriesService.getAllActiveCategories(),
      await articlesService.getAllActiveArticles()
    ];

    res.render("index", {
      categories: allCategories,
      articles: allArticles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const article = await articlesService.getArticleById(id);
    const relatedArticles = await articlesService.getRelatedArticles(article, 3);

    res.render("detail", { ...article, relatedArticles });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get("/contact", (req, res) => {
  res.redirect("/#contact");
})

router.get("/login", (req, res) => {
  res.render("login");
})

router.get("/signup", (req, res) => {
  res.render("signup");
})

// Categories page - show all categories
router.get("/categories", async (req, res) => {
  try {
    const categories = await categoriesService.getAllActiveCategories();

    // Get count of articles for each category
    const categoryCounts = await categoriesService.countArticlesByCategory();

    // Convert array to object with category id as key
    const categoryCountsObj = {};
    categoryCounts.forEach(item => {
      categoryCountsObj[item.cate_id] = item.count;
    });

    // Get latest articles for sidebar
    const latestArticles = await articlesService.getLatestArticles(5);

    if (!categories || !latestArticles) {
      return res.status(404).render("404");
    }

    res.render("categories", {
      categories: categories,
      categoryCounts: categoryCountsObj,
      latestArticles: latestArticles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Category detail page - show articles by category
router.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const category = await categoriesService.getCategoryById(id);

    if (!category) {
      return res.status(404).render("404");
    }

    const articles = await articlesService.getArticlesByCategoryId(id);

    res.render("category", {
      category: category,
      articles: articles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// protected routes (route need to be authenticated, role checked before access)
router.get("/admin", auth.verifyToken("/login"), auth.checkRole(['admin']), (req, res) => {
  res.render("admin");
})

router.get("/author", auth.verifyToken("/login"), auth.checkRole(['author']), (req, res) => {
  res.render("author");
})

// 404 route
router.get("*", (req, res) => {
  res.render("404");
});

module.exports = router;
