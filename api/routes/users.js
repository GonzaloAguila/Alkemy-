const express = require("express");
const router = express.Router();
const {getUsers,
    getUser,
    newUser,
    loginUser
} = require('../controllers/users')

router.get('/getUsers', getUsers)
router.get('/getUser/:id', getUser)
router.post('/newUser', newUser)
router.post('/login', loginUser)



module.exports = router