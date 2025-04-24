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

// get user by id
const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// check user exist
const checkUserExist = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await userService.checkUserExist(username, password);
    res.json(user);
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
    const { username, password, email, role } = req.body;
    await userService.updateUser(username, password, email, Number(role));
    res.json({ message: 'User updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// active user
const activeUser = async (req, res) => {
  try {
    const { id } = req.body;
    await userService.activeUser(id);
    res.json({ message: 'User activated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// disable user
const disableUser = async (req, res) => {
  try {
    const { id } = req.body;
    await userService.disableUser(id);
    res.json({ message: 'User disabled successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// update password
const updatePassword = async (req, res) => {
  try {
    const { username, password, newPassword } = req.body;
    await userService.updatePassword(username, password, newPassword);
    res.json({ message: 'Password updated successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// reset password
const resetPassword = async (req, res) => {
  try {
    const { username } = req.body;
    await userService.resetPassword(username);
    res.json({ message: 'Password reset successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = {
  getAllAuthors,
  getAllUsers,
  getUserById,
  checkUserExist,
  addAuthor,
  updateAuthor,
  addUser,
  updateUser,
  activeUser,
  disableUser,
  updatePassword,
  resetPassword
};