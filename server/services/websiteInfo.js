const connection = require('../db/database');
// ---------------------------------------------

const getWebsiteInfo = async () => {
  try {
    const queryStr = "SELECT * FROM websiteInfo";
    const [data] = await connection.query(queryStr);
    return data[0];
  } catch (err) {
    throw err;
  }
}

module.exports = {
  getWebsiteInfo
}