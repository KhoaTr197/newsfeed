const connection = require("../db/database");

//TEST SERVICE
const getData = async () => {
  const queryStr = "show tables;";
  const [data, schema] = await connection.query(queryStr);

  console.log(data, schema);
};

module.exports = {
  getData,
};
