const categoriesService = require("../services/categoriesService");

const getCategories = async () => {
  try {
    const categories = await categoriesService.getCategories();
    return categories;
  } catch (err) {
    console.error(err);
    return [];
  }
};

const updateCategory = async (req, res) => {
  try {
    const id = req.params.id;
    const { name, status } = req.body;
    const success = await categoriesService.updateCategory(id, name, status);
    if (success) {
      res.json({ message: "Category updated successfully" });
    } else {
      res.status(404).json({ error: "Category not found" });
    }
  } catch (err) {
    console.error(err);
  }
};

const addCategory = async (req, res) => {
  try {
    //console.log(req.body);
    const { name, status } = req.body;
    const success = await categoriesService.addCategory(name, status);
    if (success) {
      res.json({ message: "Category added successfully" });
    } else {
      res.status(404).json({ error: "Failed to add category" });
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = {
  getCategories,
  updateCategory,
  addCategory,
};
