import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Attend } from '../../database/entities/Attend';
import { updateAttendValidation } from '../../handlers/validators/attend-validator';

export const updateAttend = (app: Express): void => {
    app.patch('/attends/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateAttendValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const attendRequest = validation.value;

        const attendRepo = AppDataSource.getRepository(Attend);

        try {
            const attend = await attendRepo.findOneBy({ id: attendRequest.id });
            if (!attend) {
                res.status(404).send({ error: `Attend with ID ${attendRequest.id} not found` });
                return;
            }

            await attendRepo.update(attendRequest.id, attendRequest);
            const updatedAttend = await attendRepo.findOneBy({ id: attendRequest.id });
            res.status(200).send(updatedAttend);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}