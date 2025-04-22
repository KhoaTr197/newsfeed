const router = require("express").Router();
const categoryController = require("../controllers/categoryController");

router.put("/admin/category/:id", categoryController.updateCategory);
router.post("/admin/category", categoryController.addCategory);

module.exports = router;
