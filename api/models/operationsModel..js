const S = require("sequelize");
const db = require("../db");

class Operation extends S.Model {}
Operation.init(
  {
    concept: {
      type: S.STRING,
      allowNull: false
    },
    amount: {
      type: S.INTEGER,
    },
    type: {
      type: S.ENUM("in", "out"),
      allowNull: false 
    }
  },
  { sequelize: db, modelName: "operation" }
);

module.exports = Operation;