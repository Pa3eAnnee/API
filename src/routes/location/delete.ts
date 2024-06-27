import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Location } from '../../database/entities/Location';

// Delete a Location
export const deleteLocation = (app: Express): void => {
    app.delete('/locations/:id', async (req: Request, res: Response) => {
        const LocationId = parseInt(req.params.id);

        if (isNaN(LocationId)) {
            res.status(400).send({ error: 'Invalid Location ID' });
            return;
        }

        const LocationRepo = AppDataSource.getRepository(Location);

        try {
            const Location = await LocationRepo.findOneBy({ id: LocationId });
            if (!Location) {
                res.status(404).send({ error: `Location with ID ${LocationId} not found` });
                return;
            }

            await LocationRepo.delete(LocationId);
            res.status(200).send({ message: `Location with ID ${LocationId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}