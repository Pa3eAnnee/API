import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { VoteTable } from '../../database/entities/VoteTable';
import { updateVoteTableValidation } from '../../handlers/validators/votetable-validator';

export const updateVoteTable = (app: Express): void => {
    app.patch('/votetables/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateVoteTableValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const voteTableRequest = validation.value;

        const voteTableRepo = AppDataSource.getRepository(VoteTable);

        try {
            const voteTable = await voteTableRepo.findOneBy({ id: voteTableRequest.id });
            if (!voteTable) {
                res.status(404).send({ error: `VoteTable with ID ${voteTableRequest.id} not found` });
                return;
            }

            await voteTableRepo.update(voteTableRequest.id, voteTableRequest);
            const updatedVoteTable = await voteTableRepo.findOneBy({ id: voteTableRequest.id });
            res.status(200).send(updatedVoteTable);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}