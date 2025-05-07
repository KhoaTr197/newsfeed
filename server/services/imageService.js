const connection = require("../db/database");
//----------------------------------------------

// Upload image
const uploadImage = async (id, filepaths) => {
  try {
    const queryStr = "UPDATE articles SET original_image = ?, thumbnail = ? WHERE id = ?";
    const [result] = await connection.query(queryStr, [...filepaths, parseInt(id)]);
    return result.affectedRows > 0;
  } catch (err) {
    console.error('Error in imageService.uploadImage:', err);
    throw err;
  }
};

module.exports = {
  uploadImage,
};
