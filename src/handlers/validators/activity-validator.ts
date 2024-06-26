import * as Joi from 'joi';

export interface CreateActivityRequest {
    title: string;
    description: string;
    image: string;
    date_start: Date;
    date_end: Date;
    status: string;
    type: string;
    organizer_id: number;
    location_id: number;
}

export interface UpdateActivityRequest {
    id: number;
    title?: string;
    description?: string;
    image?: string;
    date_start?: Date;
    date_end?: Date;
    status?: string;
    type?: string;
    organizer_id?: number;
    location_id?: number;
}

export const createActivityValidation = Joi.object<CreateActivityRequest>({
    title: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required(),
    date_start: Joi.date().iso().required(),
    date_end: Joi.date().iso().required(),
    status: Joi.string().required(),
    type: Joi.string().required(),
    organizer_id: Joi.number().required(),
    location_id: Joi.number().required(),
}).options({ abortEarly: false });

export const updateActivityValidation = Joi.object<UpdateActivityRequest>({
    id: Joi.number().required(),
    title: Joi.string().optional(),
    description: Joi.string().optional(),
    image: Joi.string().optional(),
    date_start: Joi.date().iso().optional(),
    date_end: Joi.date().iso().optional(),
    status: Joi.string().optional(),
    type: Joi.string().optional(),
    organizer_id: Joi.number().optional(),
    location_id: Joi.number().optional(),
}).options({ abortEarly: false });
