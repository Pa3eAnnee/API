import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { PaymentMethod } from '../../database/entities/PaymentMethod';
import { createPaymentMethodValidation } from '../../handlers/validators/paymentmethod-validator';

export const createPaymentMethod = (app: Express) => {
    app.post('/paymentmethods', async (req: Request, res: Response) => {
        const validation = createPaymentMethodValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const paymentMethodRequest = validation.value;
        const paymentMethodRepo = AppDataSource.getRepository(PaymentMethod);

        try {
            const paymentMethodCreated = await paymentMethodRepo.save(paymentMethodRequest);
            res.status(201).send(paymentMethodCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}