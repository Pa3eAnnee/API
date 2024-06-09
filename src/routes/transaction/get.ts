import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Transaction } from '../../database/entities/Transaction';

export const getTransactions = (app: Express): void => {
    app.get('/transactions', async (req: Request, res: Response) => {
        const transactionRepo = AppDataSource.getRepository(Transaction);
        const transactions = await transactionRepo.find();
        res.status(200).send(transactions);
    });

    app.get('/transactions/:id', async (req: Request, res: Response) => {
        const transactionId = parseInt(req.params.id);
        if (!transactionId || isNaN(Number(transactionId))) {
            res.status(400).send({ error: 'Invalid transaction ID' });
            return;
        }

        const transactionRepo = AppDataSource.getRepository(Transaction);

        try {
            const transaction = await transactionRepo.findOneBy({ id: transactionId });
            if (!transaction) {
                res.status(404).send({ error: `Transaction with ID ${transactionId} not found` });
                return;
            }
            res.status(200).send(transaction);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}