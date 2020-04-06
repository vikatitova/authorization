const Joi = require('@hapi/joi');

const validationAuthSchema = Joi.object({
    password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{6,30}$')),

    email: Joi.string().email({
        minDomainSegments: 2,
        tlds: { allow: ['com', 'net'] },
    }),
});

module.exports = validationAuthSchema;
