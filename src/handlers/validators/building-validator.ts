import Joi from "joi";

export interface CreateBuildingRequest {
	name: string;
	address_id: number;
	floor: string;
	status: string;
}

export interface UpdateBuildingRequest {
	id: number;
	name?: string;
	address_id?: number;
	floor?: string;
	status?: string;
}

export const createBuildingValidation = Joi.object<CreateBuildingRequest>({
	name: Joi.string().min(1).required(),
	address_id: Joi.number().required(),
	floor: Joi.string().min(1).required(),
	status: Joi.string().min(1).required(),
}).options({ abortEarly: false });

export const updateBuildingValidation = Joi.object<UpdateBuildingRequest>({
	id: Joi.number().required(),
	name: Joi.string().min(1).optional(),
	address_id: Joi.number().optional(),
	floor: Joi.string().min(1).optional(),
	status: Joi.string().min(1).optional(),
}).options({ abortEarly: false });
