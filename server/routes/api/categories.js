const router = require("express").Router();
const categoriesController = require("../../controllers/categoriesController");
// -----------------------------------

router.get("/", categoriesController.getAllCategories);

router.put("/active", categoriesController.activeCategory);

router.put("/:id", categoriesController.updateCategory);

router.post("/", categoriesController.addCategory);

router.delete("/", categoriesController.disableCategory);

module.exports = router;
