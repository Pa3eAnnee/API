import * as Joi from 'joi';

export const createAgendaValidation = Joi.object({
    ga_id: Joi.number().required()
});

export const updateAgendaValidation = Joi.object({
    id: Joi.number().required(),
    ga_id: Joi.number().optional()
});

export type CreateAgendaRequest = {
    ga_id: number
};

export type UpdateAgendaRequest = {
    id: number,
    ga_id?: number
};
