import * as Joi from "joi";

export const createExpanseCategoryValidation = Joi.object({
	name: Joi.string().required(),
});

export const updateExpanseCategoryValidation = Joi.object({
	id: Joi.number().required(),
	name: Joi.string().optional(),
});

export type CreateExpanseCategoryRequest = {
	name: string;
};

export type UpdateExpanseCategoryRequest = {
	id: number;
	name?: string;
};
