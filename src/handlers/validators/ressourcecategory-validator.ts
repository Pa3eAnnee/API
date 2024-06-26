import * as Joi from "joi";

export const createRessourceCategoryValidation = Joi.object({
	name: Joi.string().required(),
});

export const updateRessourceCategoryValidation = Joi.object({
	id: Joi.number().required(),
	name: Joi.string().optional(),
});

export interface CreateRessourceCategoryRequest {
	name: string;
}

export interface UpdateRessourceCategoryRequest {
	id: number;
	name?: string;
}
