import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Furniture } from '../../database/entities/Furniture';

// Delete a furniture
export const deleteFurniture = (app: Express): void => {
    app.delete('/furnitures/:id', async (req: Request, res: Response) => {
        const furnitureId = parseInt(req.params.id);

        if (isNaN(furnitureId)) {
            res.status(400).send({ error: 'Invalid furniture ID' });
            return;
        }

        const furnitureRepo = AppDataSource.getRepository(Furniture);

        try {
            const furniture = await furnitureRepo.findOneBy({ id: furnitureId });
            if (!furniture) {
                res.status(404).send({ error: `Furniture with ID ${furnitureId} not found` });
                return;
            }

            await furnitureRepo.delete(furnitureId);
            res.status(200).send({ message: `Furniture with ID ${furnitureId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}