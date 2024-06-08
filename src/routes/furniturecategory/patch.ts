import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { FurnitureCategory } from '../../database/entities/FurnitureCategory';
import { updateFurnitureCategoryValidation } from '../../handlers/validators/furniturecategory-validator';

export const updateFurnitureCategory = (app: Express): void => {
    app.patch('/furniturecategorys/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateFurnitureCategoryValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const furnitureCategoryRequest = validation.value;

        const furnitureCategoryRepo = AppDataSource.getRepository(FurnitureCategory);

        try {
            const furnitureCategory = await furnitureCategoryRepo.findOneBy({ id: furnitureCategoryRequest.id });
            if (!furnitureCategory) {
                res.status(404).send({ error: `FurnitureCategory with ID ${furnitureCategoryRequest.id} not found` });
                return;
            }

            await furnitureCategoryRepo.update(furnitureCategoryRequest.id, furnitureCategoryRequest);
            const updatedFurnitureCategory = await furnitureCategoryRepo.findOneBy({ id: furnitureCategoryRequest.id });
            res.status(200).send(updatedFurnitureCategory);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}