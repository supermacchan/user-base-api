const { User } = require('../db/userSchema');
const { 
    ServerError,
    ValidationError,
} = require('../helpers/errors');
// const axios = require('axios');


const getUsers = async () => {
    try {
        const users = await User.find({});

        // this one gives an error ↓
        // const test = await axios.get("https://api.example.com/users");

        // my api works ↓ (added for testing purposes)
        // const test = await axios.get("https://superhero-backend.onrender.com/api/heroes");

        // console.log(test);

        return users;
    } catch (err) {
        console.log(err)
        throw new ServerError('The server could not complete your query.');
        // add not found error?
    }
};

const addUser = async (data) => {
    try {
        const user = new User(data);
        await User.create(user);
        return user;
    } catch (err) {
        console.log(err.message);
        throw new ValidationError('Bad request: some required fields are not filled out.');
    }
}

module.exports = {
    getUsers,
    addUser
}