import * as Joi from "joi";

export const createGeneralAssemblyValidation = Joi.object({
	date: Joi.date().required(),
	location: Joi.string().required(),
});

export const updateGeneralAssemblyValidation = Joi.object({
	id: Joi.number().required(),
	date: Joi.date().optional(),
	location: Joi.string().optional(),
});

export type CreateGeneralAssemblyRequest = {
	date: Date;
	location: string;
};

export type UpdateGeneralAssemblyRequest = {
	id: number;
	date?: Date;
	location?: string;
};
