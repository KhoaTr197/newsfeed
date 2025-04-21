const categoriesModel = require("../model/categoriesModel");

const getCategories = async () => {
  const categories = await categoriesModel.getCategories();
  if (!categories) {
    throw new Error("Categories not found");
  }
  return categories;
};

const updateCategory = async (id, name, status) => {
  const result = await categoriesModel.updateCategory(id, name, status);
  if (!result) {
    throw new Error("Error updating category");
  }
  return result;
};

const addCategory = async (name, status) => {
  const result = await categoriesModel.addCategory(name, status);
  if (!result) {
    throw new Error("Error insert category");
  }
  return result;
};

module.exports = {
  getCategories,
  updateCategory,
  addCategory,
};
