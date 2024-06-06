import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Participate } from '../../database/entities/Participate';

export const getParticipates = (app: Express): void => {
    app.get('/participates', async (req: Request, res: Response) => {
        const ParticipateRepo = AppDataSource.getRepository(Participate);
        const Participates = await ParticipateRepo.find();
        res.status(200).send(Participates);
    });

    app.get('/participates/:id', async (req: Request, res: Response) => {
        const ParticipateId = parseInt(req.params.id);

        if(isNaN(ParticipateId)) {
            res.status(400).send({ error: 'Invalid Participate ID' });
            return;
        }



        const ParticipateRepo = AppDataSource.getRepository(Participate);

        try {
            const participate = await ParticipateRepo.findOneBy({ id: 1 });
            if (!participate) {
                res.status(404).send({ error: `Participate with ID ${ParticipateId} not found` });
                return;
            }
            res.status(200).send(participate);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}