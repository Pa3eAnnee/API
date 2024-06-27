import Joi from "joi";

export interface CreateLocationRequest {
	room_id?: number;
	building_id?: number;
	address_id?: number;
}

export interface UpdateLocationRequest extends Partial<CreateLocationRequest> {
	id: number;
}

export const createLocationValidation = Joi.object<CreateLocationRequest>({
	room_id: Joi.number().optional(),
	building_id: Joi.number().optional(),
	address_id: Joi.number().optional(),
}).options({ abortEarly: false });

export const updateLocationValidation = Joi.object<UpdateLocationRequest>({
	id: Joi.number().required(),
	room_id: Joi.number().optional(),
	building_id: Joi.number().optional(),
	address_id: Joi.number().optional(),
}).options({ abortEarly: false });
