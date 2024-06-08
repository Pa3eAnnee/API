import * as Joi from 'joi';

export const createFurnitureCategoryValidation = Joi.object({
    name: Joi.string().required()
});

export const updateFurnitureCategoryValidation = Joi.object({
    id: Joi.number().required(),
    name: Joi.string().optional()
});

export interface CreateFurnitureCategoryRequest {
    name: string;
}

export interface UpdateFurnitureCategoryRequest {
    id: number;
    name?: string;
}
