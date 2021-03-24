var mysql = require("mysql2");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  database: 'mysql',
  password: "ExamplePassword",
  insecureAuth: true,
});

module.exports = connection;
