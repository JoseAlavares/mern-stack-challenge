const Joi = require('joi')

const createUserSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    secondLastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
    email: Joi.string()
        .min(3)
        .max(30)
        .required(),
    password: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .required(),
})

const updateUserSchema = Joi.object({
    name: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional(),
    lastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional(),
    secondLastName: Joi.string()
        .alphanum()
        .min(3)
        .max(30)
        .optional(),
    email: Joi.string()
        .min(3)
        .max(30)
        .optional()
})

const genericValidation = (schema, data) => {
    const isValid = schema.validate(data)

    if (isValid.error) {
        return { errors: isValid.error.details }
    }

    return true
}

const createUserValidation = (data) => {
    return genericValidation(createUserSchema, data)
}

const updateUserValidation = (data) => {
    return genericValidation(updateUserSchema, data)
}

module.exports = {
    createUserValidation,
    updateUserValidation
}