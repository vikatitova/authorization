const Joi = require('@hapi/joi');

const validationUserSchema = Joi.object({
    id: Joi.string(),

    name: Joi.string().pattern(new RegExp('^[a-zA-Z]{3,30}$')).required(),

    age: Joi.number().integer().required(),
});

module.exports = validationUserSchema;
