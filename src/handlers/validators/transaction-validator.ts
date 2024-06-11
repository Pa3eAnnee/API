import * as Joi from "joi";

export const createTransactionValidation = Joi.object({
	user_id: Joi.number().required(),
	purchase_id: Joi.number().required(),
	method_id: Joi.number().required(),
	amount: Joi.number().required(),
	status: Joi.string().required(),
	date: Joi.date().required(),
});

export const updateTransactionValidation = Joi.object({
	id: Joi.number().required(),
	user_id: Joi.number().optional(),
	purchase_id: Joi.number().optional(),
	method_id: Joi.number().optional(),
	amount: Joi.number().optional(),
	status: Joi.string().optional(),
	date: Joi.date().optional(),
});

export type CreateTransactionRequest = {
	user_id: number;
	purchase_id: number;
	method_id: number;
	amount: number;
	status: string;
	date: Date;
};

export type UpdateTransactionRequest = {
	id: number;
	user_id?: number;
	purchase_id?: number;
	method_id?: number;
	amount?: number;
	status?: string;
	date?: Date;
};
