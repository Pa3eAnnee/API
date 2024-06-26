import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { RessourceCategory } from '../../database/entities/RessourceCategory';
import { createRessourceCategoryValidation } from '../../handlers/validators/ressourcecategory-validator';

export const createRessourceCategory = (app: Express) => {
    app.post('/ressourcecategories', async (req: Request, res: Response) => {
        const validation = createRessourceCategoryValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const RessourceCategoryRequest = validation.value;
        const RessourceCategoryRepo = AppDataSource.getRepository(RessourceCategory);

        try {
            const RessourceCategoryCreated = await RessourceCategoryRepo.save(RessourceCategoryRequest);
            res.status(201).send(RessourceCategoryCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}