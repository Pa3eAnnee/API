import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Location } from '../../database/entities/Location';
import { updateLocationValidation } from '../../handlers/validators/location-validator';

export const updateLocation = (app: Express): void => {
    app.patch('/locations/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateLocationValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const LocationRequest = validation.value;

        const LocationRepo = AppDataSource.getRepository(Location);

        try {
            const Location = await LocationRepo.findOneBy({ id: LocationRequest.id });
            if (!Location) {
                res.status(404).send({ error: `Location with ID ${LocationRequest.id} not found` });
                return;
            }

            await LocationRepo.update(LocationRequest.id, LocationRequest);
            const updatedLocation = await LocationRepo.findOneBy({ id: LocationRequest.id });
            res.status(200).send(updatedLocation);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}