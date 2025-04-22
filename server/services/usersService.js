const connection = require('../db/database');
// ---------------------------------------------

// User-related database functions
// get all users
const getUsers = async () => {
  try {
    const queryStr = "SELECT * FROM users";
    const [data] = await connection.query(queryStr);
    return data;
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
    const queryStr = "UPDATE users SET password = ?, email = ?, role = ?, status = ? WHERE username = ?";
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

// reset password
const resetPassword = async (username, newPassword) => {
  try {
    const queryStr = "UPDATE users SET password = ? WHERE username = ?";
    await connection.query(queryStr, [newPassword, username]);
  } catch (err) {
    throw err;
  }
};

// Authentication-related database functions
// check user is author
const checkAuthor = async (username, password) => {
  try {
    const queryStr = "SELECT * FROM users WHERE username = ? AND password = MD5(?) AND role = 0";
    const [data] = await connection.query(queryStr, [username, password]);
    return data.length > 0;
  } catch (err) {
    throw err;
  }
};

// check user is admin
const checkAdmin = async (username, password) => {
  try {
    const queryStr = "SELECT * FROM users WHERE username = ? AND password = MD5(?) AND role = 1";
    const [data] = await connection.query(queryStr, [username, password]);
    return data.length > 0;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  getUsers,
  checkAuthor,
  checkAdmin,
  addUser,
  updateUser,
  resetPassword
};