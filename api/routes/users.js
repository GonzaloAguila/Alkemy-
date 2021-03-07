const express = require("express");
const router = express.Router();
const {getUsers,
    getUser,
    newUser
} = require('../controllers/users')

router.get('/getUsers', getUsers)
router.get('/getUser/:id', getUser)
router.post('/newUser', newUser)


module.exports = router