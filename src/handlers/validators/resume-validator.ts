import * as Joi from 'joi';

export const createResumeValidation = Joi.object({
    ga_id: Joi.number().required(),
    minutes: Joi.string().required()
});

export const updateResumeValidation = Joi.object({
    id: Joi.number().required(),
    ga_id: Joi.number().optional(),
    minutes: Joi.string().optional()
});

export type CreateResumeRequest = {
    ga_id: number,
    minutes: string
};

export type UpdateResumeRequest = {
    id: number,
    ga_id?: number,
    minutes?: string
};
