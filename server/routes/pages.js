const router = require('express').Router();
const categoriesService = require('../services/categoriesService');
const articlesService = require('../services/articlesService');
const websiteInfoService = require('../services/websiteInfo');
const auth = require('../middlewares/authMiddleware');
// -----------------------------------

router.get(["/", "/index", "/homepage"], async (req, res) => {
  try {
    const [allCategories, allArticles, websiteInfo] = [
      await categoriesService.getAllActiveCategories(),
      await articlesService.getAllActiveArticles(),
      await websiteInfoService.getWebsiteInfo()
    ];

    if (!allCategories || !allArticles) {
      return res.status(404).render("404");
    }

    res.render("index", {
      categories: allCategories,
      articles: allArticles,
      websiteInfo: websiteInfo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [article, , websiteInfo] = [
      await articlesService.getArticleById(id),
      await websiteInfoService.getWebsiteInfo()
    ];
    const relatedArticles = await articlesService.getRelatedArticles(article, 3);

    if (!article || !relatedArticles) {
      return res.status(404).render("404");
    }

    res.render("detail", { ...article, relatedArticles, websiteInfo });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
})

router.get("/contact", (req, res) => {
  res.redirect("/#contact");
})

router.get("/login", async (req, res) => {
  try {
    const websiteInfo = await websiteInfoService.getWebsiteInfo();
    res.render("login", { websiteInfo });
  } catch (err) {
    res.render("login");
  }
})

router.get("/signup", async (req, res) => {
  try {
    const websiteInfo = await websiteInfoService.getWebsiteInfo();
    res.render("signup", { websiteInfo });
  } catch (err) {
    res.render("signup");
  }
})

// Categories page - show all categories
router.get("/categories", async (req, res) => {
  try {
    const [categories, categoryCounts, latestArticles, websiteInfo] = [
      await categoriesService.getAllActiveCategories(),
      await categoriesService.countArticlesByCategory(),
      await articlesService.getLatestArticles(5),
      await websiteInfoService.getWebsiteInfo()
    ]

    // Convert array to object with category id as key
    const categoryCountsObj = {};
    categoryCounts.forEach(item => {
      categoryCountsObj[item.cate_id] = item.count;
    });

    if (!categories || !latestArticles || !categoryCounts) {
      return res.status(404).render("404");
    }

    res.render("categories", {
      categories: categories,
      categoryCounts: categoryCountsObj,
      latestArticles: latestArticles,
      websiteInfo: websiteInfo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Category detail page - show articles by category
router.get("/category/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const [category, articles, websiteInfo] = [
      await categoriesService.getCategoryById(id),
      await articlesService.getArticlesByCategoryId(id),
      await websiteInfoService.getWebsiteInfo()
    ];

    if (!category || !articles) {
      return res.status(404).render("404");
    }

    res.render("category", {
      category: category,
      articles: articles,
      websiteInfo: websiteInfo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search page
router.get("/search", async (req, res) => {
  try {
    const { keyword } = req.query;

    if (!keyword) {
      return res.status(400).json({ error: "Missing keyword parameter" });
    }

    const [articles, websiteInfo] = [
      await articlesService.searchArticlesByKeyword(keyword),
      await websiteInfoService.getWebsiteInfo()
    ];

    res.render("search", {
      articles,
      resultCount: articles.length,
      websiteInfo,
    });
  }
  catch (err) {
    res.status(500).json({ error: err.message });
  }
})

// protected routes (route need to be authenticated, role checked before access)
router.get("/admin", auth.verifyToken("/login"), auth.checkRole(['admin']), async (req, res) => {
  try {
    const websiteInfo = await websiteInfoService.getWebsiteInfo();
    res.render("admin", { websiteInfo });
  } catch (err) {
    res.render("admin");
  }
})

router.get("/author", auth.verifyToken("/login"), auth.checkRole(['author']), async (req, res) => {
  try {
    const websiteInfo = await websiteInfoService.getWebsiteInfo();
    res.render("author", { websiteInfo });
  } catch (err) {
    res.render("author");
  }
})

// 404 route
router.get("*", async (req, res) => {
  try {
    const websiteInfo = await websiteInfoService.getWebsiteInfo();
    res.render("404", { websiteInfo });
  } catch (err) {
    res.render("404");
  }
});

module.exports = router;
