import Joi from "joi";

export interface CreateRoomRequest {
	name: string;
	capacity: number;
	image: string;
	building_id: number;
	equipment: string;
	status: string;
}

export interface UpdateRoomRequest extends Partial<CreateRoomRequest> {
	id: number;
}

export const createRoomValidation = Joi.object<CreateRoomRequest>({
	name: Joi.string().min(1).required(),
	capacity: Joi.number().greater(0).required(),
	image: Joi.string().uri().optional(), // Assuming image is a URL
	building_id: Joi.number().required(),
	equipment: Joi.string().optional(), // Assuming equipment is a JSON string or similar
	status: Joi.string().required(),
}).options({ abortEarly: false });

export const updateRoomValidation = Joi.object<UpdateRoomRequest>({
	id: Joi.number().required(),
	name: Joi.string().min(1).optional(),
	capacity: Joi.number().greater(0).optional(),
	image: Joi.string().uri().optional(), // Assuming image is a URL
	building_id: Joi.number().optional(),
	equipment: Joi.string().optional(), // Assuming equipment is a JSON string or similar
}).options({ abortEarly: false });
