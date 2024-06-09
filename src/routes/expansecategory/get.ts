import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { ExpanseCategory } from '../../database/entities/ExpanseCategory';

export const getExpanseCategorys = (app: Express): void => {
    app.get('/expansecategories', async (req: Request, res: Response) => {
        const expanseCategoryRepo = AppDataSource.getRepository(ExpanseCategory);
        const expanseCategorys = await expanseCategoryRepo.find();
        res.status(200).send(expanseCategorys);
    });

    app.get('/expansecategories/:id', async (req: Request, res: Response) => {
        const expanseCategoryId = parseInt(req.params.id);
        if (!expanseCategoryId || isNaN(Number(expanseCategoryId))) {
            res.status(400).send({ error: 'Invalid expanseCategory ID' });
            return;
        }

        const expanseCategoryRepo = AppDataSource.getRepository(ExpanseCategory);

        try {
            const expansecategory = await expanseCategoryRepo.findOneBy({ id: expanseCategoryId });
            if (!expansecategory) {
                res.status(404).send({ error: `ExpanseCategory with ID ${expanseCategoryId} not found` });
                return;
            }
            res.status(200).send(expansecategory);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}