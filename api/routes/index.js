const express = require("express");
const router = express.Router();
const operationsRoutes = require('./operations')
const usersRoutes = require('./users')

//Managing routes
router.use("/operations", operationsRoutes)
router.use("/users", usersRoutes)


module.exports = router