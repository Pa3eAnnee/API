import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { ExpanseCategory } from '../../database/entities/ExpanseCategory';
import { updateExpanseCategoryValidation } from '../../handlers/validators/expansecategory-validator';

export const updateExpanseCategory = (app: Express): void => {
    app.patch('/expansecategories/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateExpanseCategoryValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const expanseCategoryRequest = validation.value;

        const expanseCategoryRepo = AppDataSource.getRepository(ExpanseCategory);

        try {
            const expanseCategory = await expanseCategoryRepo.findOneBy({ id: expanseCategoryRequest.id });
            if (!expanseCategory) {
                res.status(404).send({ error: `ExpanseCategory with ID ${expanseCategoryRequest.id} not found` });
                return;
            }

            await expanseCategoryRepo.update(expanseCategoryRequest.id, expanseCategoryRequest);
            const updatedExpanseCategory = await expanseCategoryRepo.findOneBy({ id: expanseCategoryRequest.id });
            res.status(200).send(updatedExpanseCategory);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}