const express = require("express");
const router = express.Router();
const {getUserOperations,
    newOperation,
    updateOperation,
    deleteOperation,
    getOneOperation
} = require('../controllers/operations.js')

router.get('/getOperations/:id', getUserOperations) // get all user operation
router.get('/getOneOperation/:id', getOneOperation) // get just one operation
router.post('/newOperation', newOperation) // post a new operation
router.put('/updateOperation', updateOperation) // update a single operation
router.delete('/deleteOperation/:id',deleteOperation) // delete a single operation


module.exports = router