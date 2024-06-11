import Joi from "joi";

export interface CreateFurnitureRequest {
	category_id: number;
	name: string;
	storage: string;
}

export interface UpdateFurnitureRequest {
	id: number;
	category_id?: number;
	name?: string;
	storage?: string;
}

export const createFurnitureValidation = Joi.object({
	category_id: Joi.number().required(),
	name: Joi.string().required(),
	storage: Joi.string().required(),
});

export const updateFurnitureValidation = Joi.object({
	id: Joi.number().required(),
	category_id: Joi.number().optional(),
	name: Joi.string().optional(),
	storage: Joi.string().optional(),
});
