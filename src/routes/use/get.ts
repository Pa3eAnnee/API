import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Use } from '../../database/entities/Use';

export const getUses = (app: Express): void => {
    app.get('/uses', async (req: Request, res: Response) => {
        const UseRepo = AppDataSource.getRepository(Use);
        const Uses = await UseRepo.find();
        res.status(200).send(Uses);
    });

    app.get('/uses/:id', async (req: Request, res: Response) => {
        const UseId = parseInt(req.params.id);
        if (!UseId || isNaN(Number(UseId))) {
            res.status(400).send({ error: 'Invalid Use ID' });
            return;
        }

        const UseRepo = AppDataSource.getRepository(Use);

        try {
            const use = await UseRepo.findOneBy({ id: UseId });
            if (!use) {
                res.status(404).send({ error: `Use with ID ${UseId} not found` });
                return;
            }
            res.status(200).send(use);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}