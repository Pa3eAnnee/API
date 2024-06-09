import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Transaction } from '../../database/entities/Transaction';
import { createTransactionValidation } from '../../handlers/validators/transaction-validator';

export const createTransaction = (app: Express) => {
    app.post('/transactions', async (req: Request, res: Response) => {
        const validation = createTransactionValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const transactionRequest = validation.value;
        const transactionRepo = AppDataSource.getRepository(Transaction);

        try {
            const transactionCreated = await transactionRepo.save(transactionRequest);
            res.status(201).send(transactionCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}