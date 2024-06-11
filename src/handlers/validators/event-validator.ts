import Joi from "joi";

export interface CreateEventRequest {
	title: string;
	description: string;
	image: string;
	location: string;
	date_start: Date;
	date_end: Date;
	cost: number;
	status: string;
}

export interface UpdateEventRequest {
	id: number;
	title?: string;
	description?: string;
	image?: string;
	location?: string;
	date_start?: Date;
	date_end?: Date;
	cost?: number;
	status?: string;
}

export const createEventValidation = Joi.object({
	title: Joi.string().required(),
	description: Joi.string().required(),
	image: Joi.string().required(),
	location: Joi.string().required(),
	date_start: Joi.date().required(),
	date_end: Joi.date().required(),
	cost: Joi.number().required(),
	status: Joi.string().required(),
});

export const updateEventValidation = Joi.object({
	id: Joi.number().required(),
	title: Joi.string().optional(),
	description: Joi.string().optional(),
	image: Joi.string().optional(),
	location: Joi.string().optional(),
	date_start: Joi.date().optional(),
	date_end: Joi.date().optional(),
	cost: Joi.number().optional(),
	status: Joi.string().optional(),
});
