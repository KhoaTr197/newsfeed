const connection = require("../db/database");
//----------------------------------------------

// Add a new newsletter subscriber
const addSubscriber = async (email) => {
  try {
    const queryStr = "INSERT INTO newsletterSubscribers (email) VALUES (?)";
    const [result] = await connection.query(queryStr, [email]);
    return result.affectedRows > 0;
  } catch (err) {
    // Handle duplicate email error
    if (err.code === 'ER_DUP_ENTRY') {
      throw new Error("This email is already subscribed to our newsletter.");
    }
    throw err;
  }
};

// Get all newsletter subscribers
const getAllSubscribers = async () => {
  try {
    const queryStr = "SELECT * FROM newsletterSubscribers";
    const [data] = await connection.query(queryStr);
    return data;
  } catch (err) {
    throw err;
  }
};

module.exports = {
  addSubscriber,
  getAllSubscribers
};
