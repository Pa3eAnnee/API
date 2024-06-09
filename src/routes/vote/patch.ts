import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Vote } from '../../database/entities/Vote';
import { updateVoteValidation } from '../../handlers/validators/vote-validator';

export const updateVote = (app: Express): void => {
    app.patch('/votes/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateVoteValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const voteRequest = validation.value;

        const voteRepo = AppDataSource.getRepository(Vote);

        try {
            const vote = await voteRepo.findOneBy({ id: voteRequest.id });
            if (!vote) {
                res.status(404).send({ error: `Vote with ID ${voteRequest.id} not found` });
                return;
            }

            await voteRepo.update(voteRequest.id, voteRequest);
            const updatedVote = await voteRepo.findOneBy({ id: voteRequest.id });
            res.status(200).send(updatedVote);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}