import Joi from "joi";

export interface CreateMeetingRequest {
	subject: string;
	date: string;
	status: string;
	start_time: string;
	end_time: string;
	location_id: number;
	organizer_id: number;
}

export interface UpdateMeetingRequest extends CreateMeetingRequest {
	id: number;
}

export const createMeetingValidation = Joi.object<CreateMeetingRequest>({
	subject: Joi.string().min(1).required(),
	date: Joi.date().iso().required(),
	status: Joi.string().min(1).required(),
	start_time: Joi.date().iso().required(),
	end_time: Joi.date().iso().required(),
	location_id: Joi.number().required(),
	organizer_id: Joi.number().required(),
}).options({ abortEarly: false });

export const updateMeetingValidation = Joi.object<UpdateMeetingRequest>({
	id: Joi.number().required(),
	subject: Joi.string().min(1).required(),
	date: Joi.date().iso().required(),
	status: Joi.string().min(1).required(),
	start_time: Joi.date().iso().required(),
	end_time: Joi.date().iso().required(),
	location_id: Joi.number().required(),
	organizer_id: Joi.number().required(),
}).options({ abortEarly: false });
