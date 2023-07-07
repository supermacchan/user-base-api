const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
    }
})

const User = mongoose.model('User', userSchema, 'users');

module.exports = {
    User
}
