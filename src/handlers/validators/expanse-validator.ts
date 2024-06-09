import * as Joi from 'joi';

export const createExpanseValidation = Joi.object({
    category_id: Joi.number().required(),
    approved_by: Joi.number().required(),
    date: Joi.date().required(),
    description: Joi.string().required(),
    amount: Joi.number().precision(2).required(),
    recipient: Joi.string().required(),
    status: Joi.string().required()
});

export const updateExpanseValidation = Joi.object({
    id: Joi.number().required(),
    category_id: Joi.number().optional(),
    approved_by: Joi.number().optional(),
    date: Joi.date().optional(),
    description: Joi.string().optional(),
    amount: Joi.number().precision(2).optional(),
    recipient: Joi.string().optional(),
    status: Joi.string().optional()
});

export type CreateExpanseRequest = {
    category_id: number,
    approved_by: number,
    date: Date,
    description: string,
    amount: number,
    recipient: string,
    status: string
};

export type UpdateExpanseRequest = {
    id: number,
    category_id?: number,
    approved_by?: number,
    date?: Date,
    description?: string,
    amount?: number,
    recipient?: string,
    status?: string
};
