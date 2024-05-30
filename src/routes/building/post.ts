import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { createBuildingValidation } from '../../handlers/validators/building-validator';
import { Building } from '../../database/entities/Building';


// Create a new building
export const createBuilding = (app: Express): void => {
    app.post('/buildings', async (req: Request, res: Response) => {
        const validation = createBuildingValidation.validate(req.body);

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const buildingRequest = validation.value;
        const buildingRepo = AppDataSource.getRepository(Building);

        try {
            const newBuilding = buildingRepo.create(buildingRequest);
            await buildingRepo.save(newBuilding);
            res.status(201).send(newBuilding);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}