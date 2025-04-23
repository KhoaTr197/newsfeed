const categoriesService = require("../services/categoriesService");
// ---------------------------------------------

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoriesService.getAllCategories();
    res
      .set('Content-Type', 'application/json; charset=utf-8')
      .json(categories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, status } = req.body;
    console.log(req.body);
    await categoriesService.updateCategory(id, name, status);

    res.json({ message: 'Category updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });

  }
};

const addCategory = async (req, res) => {
  try {
    const { name, status } = req.body;
    await categoriesService.addCategory(name, status);

    res.json({ message: "Category added successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllCategories,
  updateCategory,
  addCategory,
};
