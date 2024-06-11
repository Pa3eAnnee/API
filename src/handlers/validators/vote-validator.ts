import * as Joi from "joi";

export const createVoteValidation = Joi.object({
	user_id: Joi.number().required(),
	vote_id: Joi.number().required(),
});

export const updateVoteValidation = Joi.object({
	id: Joi.number().required(),
	user_id: Joi.number().optional(),
	vote_id: Joi.number().optional(),
});

export type CreateVoteRequest = {
	user_id: number;
	vote_id: number;
};

export type UpdateVoteRequest = {
	id: number;
	user_id?: number;
	vote_id?: number;
};
