import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Location } from '../../database/entities/Location';

export const getLocations = (app: Express): void => {
    app.get('/locations', async (req: Request, res: Response) => {
        const LocationRepo = AppDataSource.getRepository(Location);
        const Locations = await LocationRepo.find();
        res.status(200).send(Locations);
    });

    app.get('/locations/:id', async (req: Request, res: Response) => {
        const LocationId = parseInt(req.params.id);
        if (!LocationId || isNaN(Number(LocationId))) {
            res.status(400).send({ error: 'Invalid Location ID' });
            return;
        }

        const LocationRepo = AppDataSource.getRepository(Location);

        try {
            const location = await LocationRepo.findOneBy({ id: LocationId });
            if (!location) {
                res.status(404).send({ error: `Location with ID ${LocationId} not found` });
                return;
            }
            res.status(200).send(location);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}