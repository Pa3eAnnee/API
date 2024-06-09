import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Includes } from '../../database/entities/Includes';

// Delete a include
export const deleteInclude = (app: Express): void => {
    app.delete('/includes/:id', async (req: Request, res: Response) => {
        const includeId = parseInt(req.params.id);

        if (isNaN(includeId)) {
            res.status(400).send({ error: 'Invalid include ID' });
            return;
        }

        const includeRepo = AppDataSource.getRepository(Includes);

        try {
            const include = await includeRepo.findOneBy({ id: includeId });
            if (!include) {
                res.status(404).send({ error: `Include with ID ${includeId} not found` });
                return;
            }

            await includeRepo.delete(includeId);
            res.status(200).send({ message: `Include with ID ${includeId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}