const { User, Operation } = require("../models");

const operationController = {
 //Controller to get all operations from a user.
  getUserOperations(req, res) {
    Operation.findAll({ where: { userId: req.params.id } })
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  getOneOperation(req, res) {
    Operation.findOne({ where: { id: req.params.id } })
      .then((operation) => {
        res.send(operation);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  //Controller to create operations.
  newOperation(req, res) {
    const { concept, amount, type, userId } = req.body;
    Operation.create({ concept, amount, type })
      .then((operation) => {
        return operation
          //implementing the belongsTo 
          .setUser(userId)
          .then((completedOperation) => res.send(completedOperation));
      })
      .catch((err) => {
        res.send(err);
      });
  },
  //Controller to update operations.
  updateOperation(req, res) {
    const {concept, amount, id} = req.body
    console.log(req.body)
    Operation.update({concept, amount},{
        where: {id},
        returning: true, //we need to return the updated opertaion so we can send it to the client side.
        plain: true,
      }
    )
      .then((updatedOperation) => res.send(updatedOperation[1]))
      .catch((err) => console.log(err));
  },
 //Controller to delete operations.
  deleteOperation(req, res) {
    Operation.destroy({ where: { id: Number(req.params.id) } })
      .then(() => res.sendStatus(204))
      .catch((e) => console.log(e));
  },
};

module.exports = operationController;
