import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Topics } from '../../database/entities/Topics';

// Delete a topics
export const deleteTopics = (app: Express): void => {
    app.delete('/topics/:id', async (req: Request, res: Response) => {
        const topicsId = parseInt(req.params.id);

        if (isNaN(topicsId)) {
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

            await topicsRepo.delete(topicsId);
            res.status(200).send({ message: `Topics with ID ${topicsId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}