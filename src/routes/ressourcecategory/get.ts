import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { RessourceCategory } from '../../database/entities/RessourceCategory';

export const getRessourceCategorys = (app: Express): void => {
    app.get('/ressourcecategories', async (req: Request, res: Response) => {
        const RessourceCategoryRepo = AppDataSource.getRepository(RessourceCategory);
        const RessourceCategorys = await RessourceCategoryRepo.find();
        res.status(200).send(RessourceCategorys);
    });

    app.get('/ressourcecategories/:id', async (req: Request, res: Response) => {
        const RessourceCategoryId = parseInt(req.params.id);
        if (!RessourceCategoryId || isNaN(Number(RessourceCategoryId))) {
            res.status(400).send({ error: 'Invalid RessourceCategory ID' });
            return;
        }

        const RessourceCategoryRepo = AppDataSource.getRepository(RessourceCategory);

        try {
            const ressourcecategory = await RessourceCategoryRepo.findOneBy({ id: RessourceCategoryId });
            if (!ressourcecategory) {
                res.status(404).send({ error: `RessourceCategory with ID ${RessourceCategoryId} not found` });
                return;
            }
            res.status(200).send(ressourcecategory);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}