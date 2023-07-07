const { getUsers, addUser } = require("../services/userService");

// =========== fetch users ==============
const getUsersController = async (req, res) => {
    try {
        const users = await getUsers();
        res.status(200).json({
            status: 'success',
            code: 200,
            data: users
        });
    } catch (err) {
        console.log(err);
        res.status(err.status).json(err.message);
    }
}

// =========== add new user =============
const addUserController = async (req, res) => {
    const data = req.body; 

    try {
        const user = await addUser(data);
        res.status(201).json({
            status: 'created',
            code: 201,
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(err.status).json(err.message);
    }
}

module.exports = {
    getUsersController,
    addUserController
}