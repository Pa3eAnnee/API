import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { ExpanseCategory } from '../../database/entities/ExpanseCategory';

// Delete a expanseCategory
export const deleteExpanseCategory = (app: Express): void => {
    app.delete('/expansecategories/:id', async (req: Request, res: Response) => {
        const expanseCategoryId = parseInt(req.params.id);

        if (isNaN(expanseCategoryId)) {
            res.status(400).send({ error: 'Invalid expanseCategory ID' });
            return;
        }

        const expanseCategoryRepo = AppDataSource.getRepository(ExpanseCategory);

        try {
            const expanseCategory = await expanseCategoryRepo.findOneBy({ id: expanseCategoryId });
            if (!expanseCategory) {
                res.status(404).send({ error: `ExpanseCategory with ID ${expanseCategoryId} not found` });
                return;
            }

            await expanseCategoryRepo.delete(expanseCategoryId);
            res.status(200).send({ message: `ExpanseCategory with ID ${expanseCategoryId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}