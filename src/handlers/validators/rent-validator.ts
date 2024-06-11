import Joi from "joi";

export interface CreateRentRequest {
	furniture_id: number;
	event_id: number;
	cost: number;
	quantity: number;
}

export interface UpdateRentRequest {
	id: number;
	furniture_id?: number;
	event_id?: number;
	cost?: number;
	quantity?: number;
}

export const createRentValidation = Joi.object({
	furniture_id: Joi.number().required(),
	event_id: Joi.number().required(),
	cost: Joi.number().required(),
	quantity: Joi.number().required(),
});

export const updateRentValidation = Joi.object({
	id: Joi.number().required(),
	furniture_id: Joi.number().optional(),
	event_id: Joi.number().optional(),
	cost: Joi.number().optional(),
	quantity: Joi.number().optional(),
});
