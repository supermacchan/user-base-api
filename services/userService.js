const { User } = require('../db/userSchema');
const { 
    ServerError,
    ValidationError,
} = require('../helpers/errors');
const axios = require('axios');

const getUsers = async (url = "https://api.example.com/users") => {
    // ↑↑↑ this link currently gives an error ENOTFOUND - ↑↑↑ not possible to connect to this address 
    // needs to be replaced with a valid url
    try {
        const { data: fetchedUsers } = await axios.get(url);

        const users = fetchedUsers.map(async (singleUser) => {
            const user = new User(singleUser);
            await User.create(user);
            return user;
        })

        return users;
    } catch (err) {
        console.log(`Process stopped with error: ${err.message}`);
        throw new ServerError('The server could not complete your query.');
    }
};

const addUser = async (data) => {
    try {
        const user = new User(data);
        await User.create(user);
        return user;
    } catch (err) {
        console.log(`Process stopped with error: ${err.message}`);
        throw new ValidationError('Bad request: some required fields are not filled out.');
    }
}

module.exports = {
    getUsers,
    addUser
}