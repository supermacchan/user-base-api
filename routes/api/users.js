const express = require('express')
const router = express.Router()

const { getUsersController, addUserController } = require('../../controllers/userController');
const validateUser = require('../../middleware/validateUser');
const userSchema = require('../../helpers/validation/userSchema');

router.get('/users', getUsersController);
router.post('/addUser', validateUser(userSchema), addUserController);

module.exports = { userRouter: router };