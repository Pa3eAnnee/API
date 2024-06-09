import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Expanse } from '../../database/entities/Expanse';
import { createExpanseValidation } from '../../handlers/validators/expanse-validator';

export const createExpanse = (app: Express) => {
    app.post('/expanses', async (req: Request, res: Response) => {
        const validation = createExpanseValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const expanseRequest = validation.value;
        const expanseRepo = AppDataSource.getRepository(Expanse);

        try {
            const expanseCreated = await expanseRepo.save(expanseRequest);
            res.status(201).send(expanseCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}