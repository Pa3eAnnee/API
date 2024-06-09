import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Expanse } from '../../database/entities/Expanse';

// Delete a expanse
export const deleteExpanse = (app: Express): void => {
    app.delete('/expanses/:id', async (req: Request, res: Response) => {
        const expanseId = parseInt(req.params.id);

        if (isNaN(expanseId)) {
            res.status(400).send({ error: 'Invalid expanse ID' });
            return;
        }

        const expanseRepo = AppDataSource.getRepository(Expanse);

        try {
            const expanse = await expanseRepo.findOneBy({ id: expanseId });
            if (!expanse) {
                res.status(404).send({ error: `Expanse with ID ${expanseId} not found` });
                return;
            }

            await expanseRepo.delete(expanseId);
            res.status(200).send({ message: `Expanse with ID ${expanseId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}