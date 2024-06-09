import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Attend } from '../../database/entities/Attend';

// Delete a attend
export const deleteAttend = (app: Express): void => {
    app.delete('/attends/:id', async (req: Request, res: Response) => {
        const attendId = parseInt(req.params.id);

        if (isNaN(attendId)) {
            res.status(400).send({ error: 'Invalid attend ID' });
            return;
        }

        const attendRepo = AppDataSource.getRepository(Attend);

        try {
            const attend = await attendRepo.findOneBy({ id: attendId });
            if (!attend) {
                res.status(404).send({ error: `Attend with ID ${attendId} not found` });
                return;
            }

            await attendRepo.delete(attendId);
            res.status(200).send({ message: `Attend with ID ${attendId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}