import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Write } from '../../database/entities/Write';
import { updateWriteValidation } from '../../handlers/validators/write-validator';

export const updateWrite = (app: Express): void => {
    app.patch('/writes/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateWriteValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const writeRequest = validation.value;

        const writeRepo = AppDataSource.getRepository(Write);

        try {
            const write = await writeRepo.findOneBy({ id: writeRequest.id });
            if (!write) {
                res.status(404).send({ error: `Write with ID ${writeRequest.id} not found` });
                return;
            }

            await writeRepo.update(writeRequest.id, writeRequest);
            const updatedWrite = await writeRepo.findOneBy({ id: writeRequest.id });
            res.status(200).send(updatedWrite);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}