import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Use } from '../../database/entities/Use';
import { updateUseValidation } from '../../handlers/validators/use-validator';

export const updateUse = (app: Express): void => {
    app.patch('/uses/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateUseValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const UseRequest = validation.value;

        const UseRepo = AppDataSource.getRepository(Use);

        try {
            const Use = await UseRepo.findOneBy({ id: UseRequest.id });
            if (!Use) {
                res.status(404).send({ error: `Use with ID ${UseRequest.id} not found` });
                return;
            }

            await UseRepo.update(UseRequest.id, UseRequest);
            const updatedUse = await UseRepo.findOneBy({ id: UseRequest.id });
            res.status(200).send(updatedUse);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}