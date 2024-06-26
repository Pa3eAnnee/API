import Joi from "joi";

export interface CreateParticipateRequest {
    user_id: number;
    activity_id: number;
    role: string;
    present: boolean;
}

export interface UpdateParticipateRequest {
    id: number;
    user_id?: number;
    activity_id?: number;
    role?: string;
    present?: boolean;
}

export const createParticipateValidation = Joi.object<CreateParticipateRequest>({
    user_id: Joi.number().required(),
    activity_id: Joi.number().required(),
    role: Joi.string().required(),
    present: Joi.boolean().required(),
}).options({ abortEarly: false });

export const updateParticipateValidation = Joi.object<UpdateParticipateRequest>({
    id: Joi.number().required(),
    user_id: Joi.number().optional(),
    activity_id: Joi.number().optional(),
    role: Joi.string().optional(),
    present: Joi.boolean().optional(),
}).options({ abortEarly: false });
