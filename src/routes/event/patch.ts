import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Event } from '../../database/entities/Event';
import { updateEventValidation } from '../../handlers/validators/event-validator';

export const updateEvent = (app: Express): void => {
    app.patch('/events/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateEventValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const eventRequest = validation.value;

        const eventRepo = AppDataSource.getRepository(Event);

        try {
            const event = await eventRepo.findOneBy({ id: eventRequest.id });
            if (!event) {
                res.status(404).send({ error: `Event with ID ${eventRequest.id} not found` });
                return;
            }

            await eventRepo.update(eventRequest.id, eventRequest);
            const updatedEvent = await eventRepo.findOneBy({ id: eventRequest.id });
            res.status(200).send(updatedEvent);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}