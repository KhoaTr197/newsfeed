const connection = require('../db/database');
// ---------------------------------------------

// User-related database functions
// get all authors
const getAllAuthors = async () => {
  try {
    const queryStr = "SELECT * FROM users WHERE role = 0";
    const [data] = await connection.query(queryStr);
    return data;

  } catch (err) {
    throw err;
  }
};

// get all users
const getAllUsers = async () => {
  try {
    const queryStr = "SELECT * FROM users";
    const [data] = await connection.query(queryStr);
    return data;

  } catch (err) {
    throw err;
  }
};

// get user by id
const getUserById = async (id) => {
  try {
    const queryStr = "SELECT * FROM users WHERE id = ?";
    const [data] = await connection.query(queryStr, [id]);
    return data[0];
  } catch (err) {
    throw err;
  }
};

// add user
const addUser = async (username, password, email, role, status) => {
  try {
    const queryStr = "INSERT INTO users (username, password, email, role, status) VALUES (?, MD5(?), ?, ?, ?)";
    await connection.query(queryStr, [username, password, email, role, status]);

    return true;
  } catch (err) {
    // Handle other database errors with custom messages
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) {
        throw new Error("Username is already taken. Please choose a different username.");
      } else if (err.message.includes('email')) {
        throw new Error("Email address is already registered. Please use a different email or try to login.");
      } else {
        throw new Error("This account already exists. Please try to login.");
      }
    }

    throw new Error("An error occurred while creating your account. Please try again later.");
  }
};

// update user
const updateUser = async (username, password, email, role, status) => {
  try {
    const queryStr = "UPDATE users SET password = MD5(?), email = ?, role = ?, status = ? WHERE username = ?";
    await connection.query(queryStr, [password, email, role, status, username]);

    return true;
  } catch (err) {
    // Handle other database errors with custom messages
    if (err.code === 'ER_DUP_ENTRY') {
      if (err.message.includes('username')) {
        throw new Error("Username is already taken. Please choose a different username.");
      } else if (err.message.includes('email')) {
        throw new Error("Email address is already registered. Please use a different email or try to login.");
      } else {
        throw new Error("This account already exists. Please try to login.");
      }
    }

    throw new Error("An error occurred while creating your account. Please try again later.");
  }
};

//update password
const updatePassword = async (username, password, newPassword) => {
  try {
    const checkQueryStr = "SELECT * FROM users WHERE username = ? AND password = MD5(?)";
    const [data] = await connection.query(checkQueryStr, [username, password]);
    if (data.length === 0) {
      throw new Error("Current password is incorrect.");
    }
    const queryStr = "UPDATE users SET password = MD5(?) WHERE username = ? AND password = MD5(?)";
    await connection.query(queryStr, [newPassword, username, password]);
  } catch (err) {
    throw err;
  }
};

// reset password
const resetPassword = async (username) => {
  try {
    const queryStr = "UPDATE users SET password = MD5(?) WHERE username = ?";
    await connection.query(queryStr, [username, username]);
  } catch (err) {
    throw err;
  }
};

// Authentication-related database functions
// check user exist
const checkUserExist = async (username, password) => {
  try {
    const queryStr = "SELECT * FROM users WHERE username = ? AND password = MD5(?)";
    const [data] = await connection.query(queryStr, [username, password]);
    return data.length > 0 ? data[0] : null;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getAllAuthors,
  getAllUsers,
  getUserById,
  checkUserExist,
  addUser,
  updateUser,
  updatePassword,
  resetPassword
};