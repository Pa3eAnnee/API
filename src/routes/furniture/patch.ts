import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Furniture } from '../../database/entities/Furniture';
import { updateFurnitureValidation } from '../../handlers/validators/furniture-validator';

export const updateFurniture = (app: Express): void => {
    app.patch('/furnitures/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateFurnitureValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const furnitureRequest = validation.value;

        const furnitureRepo = AppDataSource.getRepository(Furniture);

        try {
            const furniture = await furnitureRepo.findOneBy({ id: furnitureRequest.id });
            if (!furniture) {
                res.status(404).send({ error: `Furniture with ID ${furnitureRequest.id} not found` });
                return;
            }

            await furnitureRepo.update(furnitureRequest.id, furnitureRequest);
            const updatedFurniture = await furnitureRepo.findOneBy({ id: furnitureRequest.id });
            res.status(200).send(updatedFurniture);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}