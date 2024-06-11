import * as Joi from "joi";

export const createVoteTableValidation = Joi.object({
	voteoption_id: Joi.number().required(),
	topics_id: Joi.number().required(),
	date_start: Joi.date().required(),
	date_end: Joi.date().required(),
	status: Joi.string().required(),
});

export const updateVoteTableValidation = Joi.object({
	id: Joi.number().required(),
	voteoption_id: Joi.number().optional(),
	topics_id: Joi.number().optional(),
	date_start: Joi.date().optional(),
	date_end: Joi.date().optional(),
	status: Joi.string().optional(),
});

export type CreateVoteTableRequest = {
	voteoption_id: number;
	topics_id: number;
	date_start: Date;
	date_end: Date;
	status: string;
};

export type UpdateVoteTableRequest = {
	id: number;
	voteoption_id?: number;
	topics_id?: number;
	date_start?: Date;
	date_end?: Date;
	status?: string;
};
