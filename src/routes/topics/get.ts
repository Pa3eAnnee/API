import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Topics } from '../../database/entities/Topics';

export const getTopicss = (app: Express): void => {
    app.get('/topics', async (req: Request, res: Response) => {
        const topicsRepo = AppDataSource.getRepository(Topics);
        const topicss = await topicsRepo.find();
        res.status(200).send(topicss);
    });

    app.get('/topics/:id', async (req: Request, res: Response) => {
        const topicsId = parseInt(req.params.id);
        if (!topicsId || isNaN(Number(topicsId))) {
            res.status(400).send({ error: 'Invalid topics ID' });
            return;
        }

        const topicsRepo = AppDataSource.getRepository(Topics);

        try {
            const topics = await topicsRepo.findOneBy({ id: topicsId });
            if (!topics) {
                res.status(404).send({ error: `Topics with ID ${topicsId} not found` });
                return;
            }
            res.status(200).send(topics);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}