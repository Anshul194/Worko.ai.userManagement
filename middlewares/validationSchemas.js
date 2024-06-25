const Joi = require('joi');

const userSchema = Joi.object({
    email: Joi.string().email().required(),
    name: Joi.string().required(),
    age: Joi.number().integer().min(1).required(),
    city: Joi.string().required(),
    zipCode: Joi.string().length(5).required()
});

const validateAdminSignup = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        password: Joi.string().min(6).required()
    });

module.exports = {
    userSchema,validateAdminSignup
};