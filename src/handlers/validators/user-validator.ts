import * as Joi from "joi";

export const createUserValidation = Joi.object({
	role: Joi.string().valid('guest', 'employee', 'admin', 'user').required(),
	first_name: Joi.string().required(),
	last_name: Joi.string().required(),
	birthday: Joi.date().required(),
	sexe: Joi.string().required(),
	phone: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	date_created: Joi.date().optional(), // Usually set automatically
	last_login: Joi.date().optional(),
	account_status: Joi.string().required(),
	permissions: Joi.array().items(Joi.string()).required(),
	referrer_id: Joi.number().optional(), // Added validation for referrer ID
	country: Joi.string().required(), // Added validation for country
	city: Joi.string().required() // Added validation for city
}).options({ abortEarly: false });

export const updateUserValidation = Joi.object({
	id: Joi.number().required(),
	role: Joi.string().valid('guest', 'employee', 'admin', 'user').optional(),
	first_name: Joi.string().optional(),
	last_name: Joi.string().optional(),
	birthday: Joi.date().optional(),
	sexe: Joi.string().optional(),
	phone: Joi.string().optional(),
	email: Joi.string().email().optional(),
	password: Joi.string().optional(),
	date_created: Joi.date().optional(), // Usually set automatically
	last_login: Joi.date().optional(),
	account_status: Joi.string().optional(),
	permissions: Joi.array().items(Joi.string()).optional(),
	referrer_id: Joi.number().optional(), // Added validation for referrer ID
	country: Joi.string().optional(), // Added validation for country
	city: Joi.string().optional() // Added validation for city
}).options({ abortEarly: false });

export type CreateUserRequest = {
	role: string;
	first_name: string;
	last_name: string;
	birthday: Date;
	sexe: string;
	phone: string;
	email: string;
	password: string;
	date_created?: Date; // Optional because it's set automatically
	last_login?: Date;
	account_status: string;
	permissions: string[];
	referrer_id?: number; // Optional
	country: string;
	city: string;
};

export type UpdateUserRequest = {
	id: number;
	role?: string;
	first_name?: string;
	last_name?: string;
	birthday?: Date;
	sexe?: string;
	phone?: string;
	email?: string;
	password?: string;
	date_created?: Date; // Optional because it's set automatically
	last_login?: Date;
	account_status?: string;
	permissions?: string[];
	referrer_id?: number; // Optional
	country?: string;
	city?: string;
};
