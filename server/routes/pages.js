const router = require("express").Router();
const categoriesService = require("../services/categoriesService");
const articlesService = require("../services/articlesService");
const websiteInfoService = require("../services/websiteInfo");
const contactsService = require("../services/contactsService");
const auth = require("../middlewares/authMiddleware");
// -----------------------------------

router.get(["/", "/index", "/homepage"], async (req, res) => {
  try {
    const [
      featuredCategories,
      categoriesMenu,
      latestArticles,
      mostViewedArticles,
      websiteInfo
    ] = [
        await categoriesService.getFeaturedCategories(5),
        await categoriesService.getAllActiveCategories(5),
        await articlesService.getLatestArticles(5),
        await articlesService.getMostViewedArticles(5),
        await websiteInfoService.getWebsiteInfo()
      ];

    // Get articles for each featured category
    const featuredArticles = await articlesService.getAllActiveArticles(featuredCategories.map(category => category.id), featuredCategories * 4);

    if (!featuredCategories || !latestArticles || !mostViewedArticles || !featuredArticles) {
      return res.status(404).render("404");
    }

    res.render("index", {
      featuredCategories,
      categoriesMenu,
      featuredArticles,
      latestArticles,
      mostViewedArticles,
      websiteInfo
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/detail/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const [article, categoriesMenu, websiteInfo, mostViewedArticles] = [
      await articlesService.getArticleById(id),
      await categoriesService.getAllActive(5),
      await websiteInfoService.getWebsiteInfo(),
      await articlesService.getMostViewedArticles(5)
    ];
    const relatedArticles = await articlesService.getRelatedArticles(
      article,
      3
    );

    if (!article || !relatedArticles) {
      return res.status(404).render("404", { websiteInfo, mostViewedArticles });
    }

    res.render("detail", {
      ...article,
      categoriesMenu,
      relatedArticles,
      websiteInfo,
      mostViewedArticles
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/contact", (req, res) => {
  res.redirect("/#contact");
});

router.get("/login", async (req, res) => {
  try {
    const websiteInfo = await websiteInfoService.getWebsiteInfo();
    res.render("login", { websiteInfo });
  } catch (err) {
    res.render("login");
  }
});

router.get("/signup", async (req, res) => {
  try {
    const websiteInfo = await websiteInfoService.getWebsiteInfo();
    res.render("signup", { websiteInfo });
  } catch (err) {
    res.render("signup");
  }
});

// Categories page - show all categories
router.get("/categories", async (req, res) => {
  try {
    const [categories, categoriesMenu, categoryCounts, latestArticles, websiteInfo] = [
      await categoriesService.getAllActiveCategories(),
      await categoriesService.getAllActiveCategories(5),
      await categoriesService.countArticlesByCategory(),
      await articlesService.getLatestArticles(5),
      await websiteInfoService.getWebsiteInfo(),
    ];

    // Convert array to object with category id as key
    const categoryCountsObj = {};
    categoryCounts.forEach((item) => {
      categoryCountsObj[item.cate_id] = item.count;
    });

    if (!categories || !latestArticles || !categoryCounts) {
      return res.status(404).render("404");
    }

    res.render("categories", {
      categories,
      categoriesMenu,
      categoryCounts: categoryCountsObj,
      latestArticles,
      websiteInfo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search page
router.get("/search", async (req, res) => {
  try {
    const { keyword, page = 1, limit = 15, category, sort } = req.query;

    const [
      allCategories,
      [articles, resultCount],
      mostViewedArticles,
      websiteInfo
    ] = [
        await categoriesService.getAllActiveCategories(),
        await articlesService.searchArticlesByKeyword(
          keyword,
          page,
          limit,
          category,
          sort
        ),
        await articlesService.getMostViewedArticles(5),
        await websiteInfoService.getWebsiteInfo()
      ];

    res.render("search", {
      allCategories,
      articles,
      searchTerm: keyword,
      resultCount,
      page,
      totalPages: Math.ceil(resultCount / limit),
      itemsPerPage: limit,
      category,
      sort,
      mostViewedArticles,
      websiteInfo,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// protected routes (route need to be authenticated, role checked before access)
router.get(
  "/admin",
  auth.verifyToken("/login"),
  auth.checkRole(["admin"]),
  async (req, res) => {
    try {
      const [websiteInfo, allContacts] = await Promise.all([
        websiteInfoService.getWebsiteInfo(),
        contactsService.getAllContacts(),
      ]);
      if (!allContacts) {
        return res.status(404).render("404");
      }
      console.log("test...");
      res.render("admin", { websiteInfo, contacts: allContacts });
    } catch (err) {
      console.log(err);
      res.render("admin");
    }
  }
);

router.get(
  "/author",
  auth.verifyToken("/login"),
  auth.checkRole(["author"]),
  async (req, res) => {
    try {
      const websiteInfo = await websiteInfoService.getWebsiteInfo();
      res.render("author", { websiteInfo });
    } catch (err) {
      res.render("author");
    }
  }
);

// 404 route
router.get("*", async (req, res) => {
  try {
    const [categoriesMenu, websiteInfo, mostViewedArticles] = [
      await categoriesService.getAllActiveCategories(5),
      await websiteInfoService.getWebsiteInfo(),
      await articlesService.getMostViewedArticles(5)
    ];
    res.render("404", { categoriesMenu, websiteInfo, mostViewedArticles });
  } catch (err) {
    res.render("404");
  }
});

module.exports = router;
