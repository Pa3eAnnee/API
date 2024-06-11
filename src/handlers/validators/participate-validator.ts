import Joi from "joi";

export interface CreateParticipateRequest {
	user_id: number;
	meeting_id: number;
}

export interface UpdateParticipateRequest extends CreateParticipateRequest {
	id: number;
}

export const createParticipateValidation = Joi.object<CreateParticipateRequest>(
	{
		user_id: Joi.number().required(),
		meeting_id: Joi.number().required(),
	},
).options({ abortEarly: false });

export const updateParticipateValidation = Joi.object<UpdateParticipateRequest>(
	{
		id: Joi.number().required(),
		user_id: Joi.number().required(),
		meeting_id: Joi.number().required(),
	},
).options({ abortEarly: false });
