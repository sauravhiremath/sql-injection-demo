const fs = require("fs");
const fastcsv = require("fast-csv");

const queries = {
  "products.csv":
    "INSERT INTO product (idproduct, name, price, quantity) VALUES ?",
  "participants.csv":
    "INSERT INTO participant (idparticipant, firstname, lastname, username, ccnum, address, age) VALUES ?",
  "passkeys.csv":
    "INSERT INTO passkey (idpasskey, value, idparticipant) VALUES ?",
};

function populate(connection, filename) {
  const stream = fs.createReadStream(filename);
  const csvData = [];
  const csvStream = fastcsv
    .parse()
    .on("data", function (data) {
      csvData.push(data);
    })
    .on("end", function () {
      // remove the first line: header
      csvData.shift();
      const query = queries[filename];
      connection.query(query, [csvData], (error, response) => {
        console.table(csvData.slice(0, 5));
        console.log(error || response);
        stream.close();
      });
    });

  stream.pipe(csvStream);
}

module.exports = populate;
