import Joi from "joi";

export interface CreateRessourceRequest {
	category_id: number;
	name: string;
	storage: string;
	type: string;
	details: string;
	cost: number;
}

export interface UpdateRessourceRequest extends CreateRessourceRequest {
	id: number;
}

export const createRessourceValidation = Joi.object<CreateRessourceRequest>({
	category_id: Joi.number().required(),
	name: Joi.string().required(),
	storage: Joi.string().required(),
	type: Joi.string().required(),
	details: Joi.string().required(),
	cost: Joi.number().required(),
}).options({ abortEarly: false });

export const updateRessourceValidation = Joi.object<UpdateRessourceRequest>({
	id: Joi.number().required(),
	category_id: Joi.number().required(),
	name: Joi.string().required(),
	storage: Joi.string().required(),
	type: Joi.string().required(),
	details: Joi.string().required(),
	cost: Joi.number().required(),
}).options({ abortEarly: false });
