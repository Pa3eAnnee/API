import * as Joi from 'joi';

// Define the CreateUseRequest interface
export interface CreateUseRequest {
    activity_id: number;
    ressource_id: number;
}

// Define the UpdateUseRequest interface
export interface UpdateUseRequest {
    id: number;
    activity_id?: number;
    ressource_id?: number;
}

// Create validation schema
export const createUseValidation = Joi.object<CreateUseRequest>({
    activity_id: Joi.number().required(),
    ressource_id: Joi.number().required(),
}).options({ abortEarly: false });

// Update validation schema
export const updateUseValidation = Joi.object<UpdateUseRequest>({
    id: Joi.number().required(),
    activity_id: Joi.number().optional(),
    ressource_id: Joi.number().optional(),
}).options({ abortEarly: false });
