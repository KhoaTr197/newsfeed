const router = require("express").Router();
const categoriesController = require("../controllers/categoriesController");

router.put("/admin/category/:id", categoriesController.updateCategory);
router.post("/admin/category/add", categoriesController.addCategory);

module.exports = router;
