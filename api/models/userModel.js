const S = require("sequelize");
const db = require("../db");

class User extends S.Model {}
User.init(
  {
    name: {
      type: S.STRING,
      allowNull: false,
    },
    password: {
      type: S.TEXT,
    },
    email: {
      type: S.STRING,
    }
  },
  { sequelize: db, modelName: "user" }
);

module.exports = User;