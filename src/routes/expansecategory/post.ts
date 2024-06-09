import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { ExpanseCategory } from '../../database/entities/ExpanseCategory';
import { createExpanseCategoryValidation } from '../../handlers/validators/expansecategory-validator';

export const createExpanseCategory = (app: Express) => {
    app.post('/expansecategories', async (req: Request, res: Response) => {
        const validation = createExpanseCategoryValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const expanseCategoryRequest = validation.value;
        const expanseCategoryRepo = AppDataSource.getRepository(ExpanseCategory);

        try {
            const expanseCategoryCreated = await expanseCategoryRepo.save(expanseCategoryRequest);
            res.status(201).send(expanseCategoryCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}