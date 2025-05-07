const categoriesService = require("../services/categoriesService");
// ---------------------------------------------

// get all categories
const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res.set("Content-Type", "application/json; charset=utf-8").json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update category
const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    console.log(req.body);
    await categoriesService.updateCategory(id, name);

    res.json({ message: "Category updated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// add category
const addCategory = async (req, res) => {
  try {
    const { name, status } = req.body;
    const newCategory = await categoriesService.addCategory(name, status);

    res.json({
      newCategory: newCategory,
      message: "Category added successfully",
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// active category
const activeCategory = async (req, res) => {
  try {
    const { id } = req.body;
    await categoriesService.activeCategory(id);

    res.json({ message: "Category activated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// disable category
const disableCategory = async (req, res) => {
  try {
    const { id } = req.body;
    await categoriesService.disableCategory(id);

    res.json({ message: "Category deactivated successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  updateCategory,
  addCategory,
  activeCategory,
  disableCategory,
};
