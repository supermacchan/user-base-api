const { User } = require('../db/userSchema');
const { 
    ServerError,
    ValidationError,
} = require('../helpers/errors');
const axios = require('axios');


const getUsers = async () => {
    try {
        // temporarily taking users from the database
        const users = await User.find({});

        // this one currently gives an error ENOTFOUND ↓
        const url = "https://api.example.com/users";
        const test = await axios.get(url);

        // my api works ↓ (added for testing purposes)
        // const test = await axios.get("https://superhero-backend.onrender.com/api/heroes");

        console.log(test.data);

        // temp
        return users;
    } catch (err) {
        console.log(err)
        throw new ServerError('The server could not complete your query.');
        // throw new ServerError(err.message);
    }
};

const addUser = async (data) => {
    try {
        console.log(data);
        const user = new User(data);
        await User.create(user);
        return user;
    } catch (err) {
        console.log(err);
        throw new ValidationError('Bad request: some required fields are not filled out.');
    }
}

module.exports = {
    getUsers,
    addUser
}