const { User, Operation} = require("../models");

const userController = {
  getUsers(req, res) {
    User.findAll({})
      .then((users) => {
        res.send(users);
      })
      .catch((err) => {
        res.send(err);
      });
  },
  getUser(req, res) {
    User.findOne({
      where: {
      name: req.params.name,
      },
    })
      .then((user) => {
        res.send(user);
      })
      .catch((err) => res.send(err));
  },
  newUser(req, res) {
    User.create(req.body)
      .then((user) => {
        res.status(200).send(user);
      })
      .catch((err) => res.send(err));
  },
  getUserOperations(req, res) {
    User.findOne({
      where:{id: req.params.id},
      include: [{ model: Operation}],
      order: [["createdAt", "DESC"]]
    })
      .then((operations) => {
        res.status(200).send(operations);
      })
      .catch((err) => res.send(err));
  },
};

module.exports = userController;