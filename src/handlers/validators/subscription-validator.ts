import * as Joi from "joi";

export const createSubscriptionValidation = Joi.object({
	transaction_id: Joi.number().required(),
	date_start: Joi.date().required(),
	date_end: Joi.date().required(),
	status: Joi.string().required()
});

export const updateSubscriptionValidation = Joi.object({
	id: Joi.number().required(),
	transaction_id: Joi.number().optional(),
	date_start: Joi.date().optional(),
	date_end: Joi.date().optional(),
	status: Joi.string().optional()
});

export type CreateSubscriptionRequest = {
	transaction_id: number;
	date_start: Date;
	date_end: Date;
	status: string;
};

export type UpdateSubscriptionRequest = {
	id: number;
	transaction_id?: number;
	date_start?: Date;
	date_end?: Date;
	status?: string;
};
