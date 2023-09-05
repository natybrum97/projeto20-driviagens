import Joi from "joi";

export const schemaTravels = Joi.object({
    passengerId: Joi.number().required(),
	flightId: Joi.number().required()
})