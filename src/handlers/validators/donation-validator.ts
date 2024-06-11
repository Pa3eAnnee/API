import * as Joi from "joi";

export const createDonationValidation = Joi.object({
	transaction_id: Joi.number().required(),
	type: Joi.string().required(),
	amount: Joi.number().required(),
	date: Joi.date().required(),
});

export const updateDonationValidation = Joi.object({
	id: Joi.number().required(),
	transaction_id: Joi.number().optional(),
	type: Joi.string().optional(),
	amount: Joi.number().optional(),
	date: Joi.date().optional(),
});

export type CreateDonationRequest = {
	transaction_id: number;
	type: string;
	amount: number;
	date: Date;
};

export type UpdateDonationRequest = {
	id: number;
	transaction_id?: number;
	type?: string;
	amount?: number;
	date?: Date;
};
