const userService = require('../services/usersService');
// ---------------------------------------------

// get all authors
const getAllAuthors = async (req, res) => {
  try {
    const users = await userService.getAllAuthors();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// check user is author
const checkAuthor = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isAuthor = await userService.checkAuthor(username, password);
    res.json({ isAuthor });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// check user is admin
const checkAdmin = async (req, res) => {
  try {
    const { username, password } = req.body;
    const isAdmin = await userService.checkAdmin(username, password);
    res.json({ isAdmin });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// add author
const addAuthor = async (req, res) => {
  try {
    const { username, password, email, status } = req.body;
    await userService.addUser(username, password, email, 0, Number(status));
    res.json({ message: 'Author added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update author
const updateAuthor = async (req, res) => {
  try {
    const { username, password, email, status } = req.body;
    await userService.updateUser(username, password, email, 0, Number(status));
    res.json({ message: 'Author updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// add user
const addUser = async (req, res) => {
  try {
    const { username, password, email, role, status } = req.body;
    await userService.addUser(username, password, email, Number(role), Number(status));
    res.json({ message: 'User added successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update user
const updateUser = async (req, res) => {
  try {
    const { username, password, email, role, status } = req.body;
    await userService.updateUser(username, password, email, Number(role), Number(status));
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const { username, newPassword } = req.body;
    await userService.resetPassword(username, newPassword);
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAllUsers,
  checkAuthor,
  checkAdmin,
  addAuthor,
  updateAuthor,
  addUser,
  updateUser,
  resetPassword
};