import * as Joi from 'joi';

export const createTopicsValidation = Joi.object({
    agenda_id: Joi.number().required(),
    subject: Joi.string().required(),
    description: Joi.string().required(),
    priority: Joi.number().required()
});

export const updateTopicsValidation = Joi.object({
    id: Joi.number().required(),
    agenda_id: Joi.number().optional(),
    subject: Joi.string().optional(),
    description: Joi.string().optional(),
    priority: Joi.number().optional()
});

export type CreateTopicsRequest = {
    agenda_id: number,
    subject: string,
    description: string,
    priority: number
};

export type UpdateTopicsRequest = {
    id: number,
    agenda_id?: number,
    subject?: string,
    description?: string,
    priority?: number
};
