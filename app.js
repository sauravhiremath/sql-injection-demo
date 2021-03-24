"use strict";

const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql2");

const dbConnection = require("./db/db-connect");
const populate = require("./db/getCsvData");

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({ extended: true }));

dbConnection.connect(function (err) {
  if (err) throw err;

  const createParticipantTableQ = `CREATE TABLE IF NOT EXISTS participant (
    idparticipant INT NOT NULL PRIMARY KEY,
    firstname VARCHAR(45),
    lastname VARCHAR(45),
    username VARCHAR(45),
    ccnum VARCHAR(45),
    address VARCHAR(45),
    age INT);`;

  const createProductTableQ = `CREATE TABLE IF NOT EXISTS product (
    idproduct INT NOT NULL PRIMARY KEY,
    name VARCHAR(45),
    price DOUBLE,
    quantity INT);`;

  const createPasskeyTableQ = `CREATE TABLE IF NOT EXISTS passkey (
    idpasskey INT NOT NULL PRIMARY KEY,
    value VARCHAR(45),
    idparticipant INT);`;

  dbConnection.query(createParticipantTableQ, (err, response) => {
    console.log(err || response);
  });
  dbConnection.query(createProductTableQ, (err, response) => {
    console.log(err || response);
  });
  dbConnection.query(createPasskeyTableQ, (err, response) => {
    console.log(err || response);
  });

  setTimeout(() => {
    populate(dbConnection, "participants.csv");
    populate(dbConnection, "products.csv");
    populate(dbConnection, "passkeys.csv");
  }, 1000);
  console.log("Connected!");
});

app.get("/", function (req, res) {
  res.render("home");
});

app.post("/query", function (req, res) {
  var connection_string = `SELECT * FROM product WHERE name LIKE '%${req.body.query}%'`;
  dbConnection.query(connection_string, function (err, result) {
    if (err) {
      console.error(err);
      console.warn("SQL Query: " + mysql.raw(connection_string).toSqlString());
    } else {
      console.log("SQL Query: " + mysql.raw(connection_string).toSqlString());
      res.setHeader("Content-Type", "application/json");
      res.send(JSON.stringify(result));
    }
  });
});

app.listen(process.env.PORT | 3000, process.env.IP, function () {
  console.log("Server started...");
});
