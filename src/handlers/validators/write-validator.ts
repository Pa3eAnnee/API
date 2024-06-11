import * as Joi from "joi";

export const createWriteValidation = Joi.object({
	user_id: Joi.number().required(),
	expanse_id: Joi.number().required(),
});

export const updateWriteValidation = Joi.object({
	id: Joi.number().required(),
	user_id: Joi.number().optional(),
	expanse_id: Joi.number().optional(),
});

export type CreateWriteRequest = {
	user_id: number;
	expanse_id: number;
};

export type UpdateWriteRequest = {
	id: number;
	user_id?: number;
	expanse_id?: number;
};
