import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { FurnitureCategory } from '../../database/entities/FurnitureCategory';
import { createFurnitureCategoryValidation } from '../../handlers/validators/furniturecategory-validator';

export const createFurnitureCategory = (app: Express) => {
    app.post('/furniturecategorys', async (req: Request, res: Response) => {
        const validation = createFurnitureCategoryValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const furnitureCategoryRequest = validation.value;
        const furnitureCategoryRepo = AppDataSource.getRepository(FurnitureCategory);

        try {
            const furnitureCategoryCreated = await furnitureCategoryRepo.save(furnitureCategoryRequest);
            res.status(201).send(furnitureCategoryCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}