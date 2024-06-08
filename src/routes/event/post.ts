import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Event } from '../../database/entities/Event';
import { createEventValidation } from '../../handlers/validators/event-validator';

export const createEvent = (app: Express) => {
    app.post('/events', async (req: Request, res: Response) => {
        const validation = createEventValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const eventRequest = validation.value;
        const eventRepo = AppDataSource.getRepository(Event);

        try {
            const eventCreated = await eventRepo.save(eventRequest);
            res.status(201).send(eventCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}