import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Use } from '../../database/entities/Use';
import { createUseValidation } from '../../handlers/validators/use-validator';

export const createUse = (app: Express) => {
    app.post('/uses', async (req: Request, res: Response) => {
        const validation = createUseValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const UseRequest = validation.value;
        const UseRepo = AppDataSource.getRepository(Use);

        try {
            const UseCreated = await UseRepo.save(UseRequest);
            res.status(201).send(UseCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}