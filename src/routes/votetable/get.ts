import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { VoteTable } from '../../database/entities/VoteTable';

export const getVoteTables = (app: Express): void => {
    app.get('/votetables', async (req: Request, res: Response) => {
        const voteTableRepo = AppDataSource.getRepository(VoteTable);
        const voteTables = await voteTableRepo.find();
        res.status(200).send(voteTables);
    });

    app.get('/votetables/:id', async (req: Request, res: Response) => {
        const voteTableId = parseInt(req.params.id);
        if (!voteTableId || isNaN(Number(voteTableId))) {
            res.status(400).send({ error: 'Invalid voteTable ID' });
            return;
        }

        const voteTableRepo = AppDataSource.getRepository(VoteTable);

        try {
            const votetable = await voteTableRepo.findOneBy({ id: voteTableId });
            if (!votetable) {
                res.status(404).send({ error: `VoteTable with ID ${voteTableId} not found` });
                return;
            }
            res.status(200).send(votetable);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}