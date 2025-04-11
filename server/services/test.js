const connection = require('../db/database');

//TEST SERVICE
const getData = async () => {
  const queryStr = "SELECT * FROM `USERS`";
  const [data, schema] = await connection.query(queryStr);

  console.log(data, schema)
};

module.exports = {
  getData
};