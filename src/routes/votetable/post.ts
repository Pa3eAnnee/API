import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { VoteTable } from '../../database/entities/VoteTable';
import { createVoteTableValidation } from '../../handlers/validators/votetable-validator';

export const createVoteTable = (app: Express) => {
    app.post('/votetables', async (req: Request, res: Response) => {
        const validation = createVoteTableValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const voteTableRequest = validation.value;
        const voteTableRepo = AppDataSource.getRepository(VoteTable);

        try {
            const voteTableCreated = await voteTableRepo.save(voteTableRequest);
            res.status(201).send(voteTableCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}