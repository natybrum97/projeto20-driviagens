import Joi from "joi";

export const schemaFlights = Joi.object({
    origin: Joi.number().required(),
	destination: Joi.number().required(),
	date: Joi.string().regex(/^\d{2}-\d{2}-\d{4}$/).required()
})