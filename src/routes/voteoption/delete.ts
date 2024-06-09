import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import {VoteOption} from "../../database/entities/VoteOption";

// Delete a voteoption
export const deleteVoteoption = (app: Express): void => {
    app.delete('/voteoptions/:id', async (req: Request, res: Response) => {
        const voteoptionId = parseInt(req.params.id);

        if (isNaN(voteoptionId)) {
            res.status(400).send({ error: 'Invalid voteoption ID' });
            return;
        }

        const voteoptionRepo = AppDataSource.getRepository(VoteOption);

        try {
            const voteoption = await voteoptionRepo.findOneBy({ id: voteoptionId });
            if (!voteoption) {
                res.status(404).send({ error: `Voteoption with ID ${voteoptionId} not found` });
                return;
            }

            await voteoptionRepo.delete(voteoptionId);
            res.status(200).send({ message: `Voteoption with ID ${voteoptionId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}