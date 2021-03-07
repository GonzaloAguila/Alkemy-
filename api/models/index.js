const Operation = require("./operationsModel.")
const User = require("./userModel")

//Grouping models and relations.
Operation.belongsTo(User);
//belongsTo is the best relation in this case, because one user will have many operations, but that 
//opertion will only belongs to that user, so we can just add the userId in the operation table.

module.exports = {Operation, User}