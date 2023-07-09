const { User } = require('../db/userSchema');
const { 
    ServerError,
    ValidationError,
} = require('../helpers/errors');
const axios = require('axios');

// ↓↓↓ this link currently gives an error ENOTFOUND - not possible to connect to this address 
const url = "https://api.example.com/users";

const getUsers = async () => {
    try {
        const users = await axios.get(url);
        return users.data;
    } catch (err) {
        throw new ServerError('The server could not complete your query.');
    }
};

const addUser = async (data) => {
    try {
        const user = new User(data);
        await User.create(user);
        return user;
    } catch (err) {
        throw new ValidationError('Bad request: some required fields are not filled out.');
    }
}

module.exports = {
    getUsers,
    addUser
}