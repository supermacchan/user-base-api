const Joi = require('joi');

const userSchema = Joi.object({
    name: Joi.string().required(),
    age: Joi.number().required(),
    email: Joi.string().email().required(),
});

module.exports = userSchema;