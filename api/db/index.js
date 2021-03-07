const Sequelize = require("sequelize");
const db = new Sequelize(
  "postgres://postgres:14781716asd@localhost:5432/alkemy",
  {
    "logging": false,
  }
);

module.exports = db