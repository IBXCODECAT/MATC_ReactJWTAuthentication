const Joi = require('@hapi/joi');
const joi = require('@hapi/joi');

const authSchema = joi.object({
    email: Joi.string().email().lowercase().required(),
    password: Joi.string().min(8).required(),
});

module.exports = {
    authSchema,
}