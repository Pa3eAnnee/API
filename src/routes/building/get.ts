import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Building } from '../../database/entities/Building';

// Get all buildings
export const getBuildings = (app: Express): void => {
    app.get('/buildings', async (req: Request, res: Response) => {
        const buildingRepo = AppDataSource.getRepository(Building);
        const buildings = await buildingRepo.find();
        res.status(200).send(buildings);
    });

    // Get building by ID
    app.get('/buildings/:id', async (req: Request, res: Response) => {
        const buildingId = parseInt(req.params.id);

        if (isNaN(buildingId)) {
            res.status(400).send({ error: 'Invalid building ID' });
            return;
        }

        const buildingRepo = AppDataSource.getRepository(Building);

        try {
            const building = await buildingRepo.findOneBy({ id: buildingId });
            if (!building) {
                res.status(404).send({ error: `Building with ID ${buildingId} not found` });
                return;
            }

            res.status(200).send(building);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}

