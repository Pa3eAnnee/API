import * as Joi from "joi";

export const createIncludesValidation = Joi.object({
	agenda_id: Joi.number().required(),
	topics_id: Joi.number().required(),
});

export const updateIncludesValidation = Joi.object({
	id: Joi.number().required(),
	agenda_id: Joi.number().optional(),
	topics_id: Joi.number().optional(),
});

export type CreateIncludesRequest = {
	agenda_id: number;
	topics_id: number;
};

export type UpdateIncludesRequest = {
	id: number;
	agenda_id?: number;
	topics_id?: number;
};
