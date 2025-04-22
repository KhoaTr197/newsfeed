const router = require("express").Router();
const categoriesController = require("../../controllers/categoriesController");
// -----------------------------------

router.get("/", categoriesController.getAllCategories);
router.put("/:id", categoriesController.updateCategory);
router.post("/", categoriesController.addCategory);

module.exports = router;
