import * as Joi from "joi";

export const createAttendValidation = Joi.object({
	user_id: Joi.number().required(),
	ga_id: Joi.number().required(),
});

export const updateAttendValidation = Joi.object({
	id: Joi.number().required(),
	user_id: Joi.number().optional(),
	ga_id: Joi.number().optional(),
});

export type CreateAttendRequest = {
	user_id: number;
	ga_id: number;
};

export type UpdateAttendRequest = {
	id: number;
	user_id?: number;
	ga_id?: number;
};
