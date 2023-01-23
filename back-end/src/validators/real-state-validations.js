const Joi = require('joi')

const createRealStateSchema = Joi.object({
    description: Joi.string()
        .min(3)
        .required(),
    field: Joi.number()
        .required(),
    construction: Joi.number()
        .required(),
    address: Joi.string()
        .min(10)
        .required(),
    contactPhone: Joi.string()
        .min(3)
        .required(),
    contactMail: Joi.string()
        .min(3)
        .required(),
    bathrooms: Joi.number()
        .required(),
    bedrooms: Joi.number()
        .required(),
    parkingLots: Joi.number()
        .required(),
})

const updateRealStateSchema = Joi.object({
    description: Joi.string()
        .min(3)
        .optional(),
    field: Joi.number()
        .optional(),
    construction: Joi.number()
        .optional(),
    address: Joi.string()
        .min(5)
        .optional(),
    contactPhone: Joi.string()
        .min(3)
        .optional(),
    contactMail: Joi.string()
        .min(3)
        .optional(),
    bathrooms: Joi.number()
        .optional(),
    bedrooms: Joi.number()
        .optional(),
    parkingLots: Joi.number()
        .optional(),
})

const genericValidation = (schema, data) => {
    const isValid = schema.validate(data)

    if (isValid.error) {
        return { errors: isValid.error.details }
    }

    return true
}

const createRealStateValidation = (data) => {
    return genericValidation(createRealStateSchema, data)
}

const updateRealStateValidation = (data) => {
    return genericValidation(updateRealStateSchema, data)
}

module.exports = {
    createRealStateValidation,
    updateRealStateValidation
}