import * as Joi from "joi";

export const createDebateValidation = Joi.object({
	ga_id: Joi.number().required(),
	agenda_id: Joi.number().required(),
});

export const updateDebateValidation = Joi.object({
	id: Joi.number().required(),
	ga_id: Joi.number().optional(),
	agenda_id: Joi.number().optional(),
});

export type CreateDebateRequest = {
	ga_id: number;
	agenda_id: number;
};

export type UpdateDebateRequest = {
	id: number;
	ga_id?: number;
	agenda_id?: number;
};
