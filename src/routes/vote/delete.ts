import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Vote } from '../../database/entities/Vote';

// Delete a vote
export const deleteVote = (app: Express): void => {
    app.delete('/votes/:id', async (req: Request, res: Response) => {
        const voteId = parseInt(req.params.id);

        if (isNaN(voteId)) {
            res.status(400).send({ error: 'Invalid vote ID' });
            return;
        }

        const voteRepo = AppDataSource.getRepository(Vote);

        try {
            const vote = await voteRepo.findOneBy({ id: voteId });
            if (!vote) {
                res.status(404).send({ error: `Vote with ID ${voteId} not found` });
                return;
            }

            await voteRepo.delete(voteId);
            res.status(200).send({ message: `Vote with ID ${voteId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}