import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Location } from '../../database/entities/Location';
import { createLocationValidation } from '../../handlers/validators/location-validator';

export const createLocation = (app: Express) => {
    app.post('/locations', async (req: Request, res: Response) => {
        const validation = createLocationValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const LocationRequest = validation.value;
        const LocationRepo = AppDataSource.getRepository(Location);

        try {
            const LocationCreated = await LocationRepo.save(LocationRequest);
            res.status(201).send(LocationCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}