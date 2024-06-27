import * as Joi from "joi";

export type CreateLocationRequest = {
	room_id?: number;
	building_id?: number;
	address_id?: number;
};

export type UpdateLocationRequest = {
	id: number;
	room_id?: number;
	building_id?: number;
	address_id?: number;
};

// Validator schemas
export const createLocationValidation = Joi.object({
	room_id: Joi.number().integer().min(1).max(100).optional(),
	building_id: Joi.number().integer().min(1).max(100).optional(),
	address_id: Joi.number().integer().min(1).max(100).optional(),
})
	.or("room_id", "building_id", "address_id")
	.required();

export const updateLocationValidation = Joi.object({
	id: Joi.number().required(),
	room_id: Joi.number().integer().min(1).max(100).optional(),
	building_id: Joi.number().integer().min(1).max(100).optional(),
	address_id: Joi.number().integer().min(1).max(100).optional(),
})
	.or("room_id", "building_id", "address_id")
	.required();
