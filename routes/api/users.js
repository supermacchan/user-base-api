const express = require('express')
const router = express.Router()

const { getUsersController, addUserController } = require('../../controllers/userController');

router.get('/users', getUsersController);
router.post('/addUser', addUserController);

module.exports = { userRouter: router };