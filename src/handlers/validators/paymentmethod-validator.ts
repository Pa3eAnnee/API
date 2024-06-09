import * as Joi from 'joi';

export const createPaymentMethodValidation = Joi.object({
    transaction_id: Joi.number().required(),
    method: Joi.string().required(),
    details: Joi.string().required()
});

export const updatePaymentMethodValidation = Joi.object({
    id: Joi.number().required(),
    transaction_id: Joi.number().optional(),
    method: Joi.string().optional(),
    details: Joi.string().optional()
});

export type CreatePaymentMethodRequest = {
    transaction_id: number,
    method: string,
    details: string
};

export type UpdatePaymentMethodRequest = {
    id: number,
    transaction_id?: number,
    method?: string,
    details?: string
};
