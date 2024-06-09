import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Debate } from '../../database/entities/Debate';

export const getDebates = (app: Express): void => {
    app.get('/debates', async (req: Request, res: Response) => {
        const debateRepo = AppDataSource.getRepository(Debate);
        const debates = await debateRepo.find();
        res.status(200).send(debates);
    });

    app.get('/debates/:id', async (req: Request, res: Response) => {
        const debateId = parseInt(req.params.id);
        if (!debateId || isNaN(Number(debateId))) {
            res.status(400).send({ error: 'Invalid debate ID' });
            return;
        }

        const debateRepo = AppDataSource.getRepository(Debate);

        try {
            const debate = await debateRepo.findOneBy({ id: debateId });
            if (!debate) {
                res.status(404).send({ error: `Debate with ID ${debateId} not found` });
                return;
            }
            res.status(200).send(debate);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}