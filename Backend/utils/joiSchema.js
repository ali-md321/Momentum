const Joi = require("joi");

module.exports.userJoiSchema = Joi.object({
    name: Joi.string().required(),
    
    username: Joi.string()
        .required()
        .pattern(new RegExp('^[A-Za-z0-9_]+$'))
        .min(5)
        .messages({
            'string.pattern.base': 'Username can only contain letters, numbers, and underscores.'
        }),
    
    password: Joi.string().required().min(6)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$])[a-zA-Z0-9!@#$]{6,30}$')
        )
            .messages({
                'string.pattern.base': "password should only contain Alphabets or Numbers or Special chars!!"
            }),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net','in'] } })
        .required(),
    avatar: Joi.any().optional(),
    bio : Joi.string().allow("").optional(),
});

module.exports.userEditJoiSchema = Joi.object({
    name: Joi.string().required(),
    username: Joi.string()
        .required()
        .pattern(new RegExp('^[A-Za-z0-9_]+$'))
        .min(5)
        .messages({
            'string.pattern.base': 'Username can only contain letters, numbers, and underscores.'
        }),
    
    email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'in'] } })
        .required(),
    avatar: Joi.any().optional(),
    bio : Joi.string().allow("").optional(),
    prevFilename : Joi.any()
});

module.exports.passwordJoiSchema = Joi.object({
    password: Joi.string().required().min(6)
            .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[!@#$])[a-zA-Z0-9!@#$]{6,30}$'))
            .messages({
                'string.pattern.base': "password should only contain Alphabets or Numbers or Special chars!!"
            })
})
