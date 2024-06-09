import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import {VoteOption} from "../../database/entities/VoteOption";
import {createVoteOptionValidation} from "../../handlers/validators/voteoption-validator";

export const createVoteoption = (app: Express) => {
    app.post('/voteoptions', async (req: Request, res: Response) => {
        const validation = createVoteOptionValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const voteoptionRequest = validation.value;
        const voteoptionRepo = AppDataSource.getRepository(VoteOption);

        try {
            const voteoptionCreated = await voteoptionRepo.save(voteoptionRequest);
            res.status(201).send(voteoptionCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}