import * as Joi from 'joi';

export const createMembershipCardValidation = Joi.object({
    transaction_id: Joi.number().required(),
    status: Joi.string().required(),
    type: Joi.string().required(),
    date_received: Joi.date().required()
});

export const updateMembershipCardValidation = Joi.object({
    id: Joi.number().required(),
    transaction_id: Joi.number().optional(),
    status: Joi.string().optional(),
    type: Joi.string().optional(),
    date_received: Joi.date().optional()
});

export type CreateMembershipCardRequest = {
    transaction_id: number,
    status: string,
    type: string,
    date_received: Date
};

export type UpdateMembershipCardRequest = {
    id: number,
    transaction_id?: number,
    status?: string,
    type?: string,
    date_received?: Date
};
