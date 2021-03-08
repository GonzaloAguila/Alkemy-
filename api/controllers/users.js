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
      name: req.params.id,
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
  loginUser(req,res){
    User.findOne({where: {email : req.body.email, password: req.body.password}})
    .then(user => res.send(user))
    .catch(()=>res.sendStatus(401))
  }
};

module.exports = userController;