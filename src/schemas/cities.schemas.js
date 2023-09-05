import Joi from "joi";

export const schemaCities = Joi.object({
    name: Joi.string().min(2).max(50).required()
})