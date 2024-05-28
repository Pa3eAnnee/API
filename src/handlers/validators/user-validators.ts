import Joi from "joi";

// Define the request interfaces
export interface CreateUserRequest {
    role: string;
    first_name: string;
    last_name: string;
    birthday: Date;
    sexe: string;
    email: string;
    phone: string;
    password: string;
}

export interface UpdateUserRequest {
    id: number;
    role?: string;
    first_name?: string;
    last_name?: string;
    birthday?: Date;
    sexe?: string;
    email?: string;
    phone?: string;
    password?: string;
}

// Create validation schema
export const createUserValidation = Joi.object<CreateUserRequest>({
    role: Joi.string().min(1).required(),
    first_name: Joi.string().min(1).required(),
    last_name: Joi.string().min(1).required(),
    birthday: Joi.date().required(),
    sexe: Joi.string().min(1).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().min(1).required(),
    password: Joi.string().min(8).required()
}).options({ abortEarly: false });

// Update validation schema
export const updateUserValidation = Joi.object<UpdateUserRequest>({
    id: Joi.number().required(),
    role: Joi.string().min(1).optional(),
    first_name: Joi.string().min(1).optional(),
    last_name: Joi.string().min(1).optional(),
    birthday: Joi.date().optional(),
    sexe: Joi.string().min(1).optional(),
    email: Joi.string().email().optional(),
    phone: Joi.string().min(1).optional(),
    password: Joi.string().min(8).optional()
}).options({ abortEarly: false });
