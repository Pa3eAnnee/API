import * as Joi from "joi";

export const createVoteOptionValidation = Joi.object({
	name: Joi.string().required(),
	description: Joi.string().required(),
});

export const updateVoteOptionValidation = Joi.object({
	id: Joi.number().required(),
	name: Joi.string().optional(),
	description: Joi.string().optional(),
});

export type CreateVoteOptionRequest = {
	name: string;
	description: string;
};

export type UpdateVoteOptionRequest = {
	id: number;
	name?: string;
	description?: string;
};
