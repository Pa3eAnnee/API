import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { PaymentMethod } from '../../database/entities/PaymentMethod';

export const getPaymentMethods = (app: Express): void => {
    app.get('/paymentmethods', async (req: Request, res: Response) => {
        const paymentMethodRepo = AppDataSource.getRepository(PaymentMethod);
        const paymentMethods = await paymentMethodRepo.find();
        res.status(200).send(paymentMethods);
    });

    app.get('/paymentmethods/:id', async (req: Request, res: Response) => {
        const paymentMethodId = parseInt(req.params.id);
        if (!paymentMethodId || isNaN(Number(paymentMethodId))) {
            res.status(400).send({ error: 'Invalid paymentMethod ID' });
            return;
        }

        const paymentMethodRepo = AppDataSource.getRepository(PaymentMethod);

        try {
            const paymentmethod = await paymentMethodRepo.findOneBy({ id: paymentMethodId });
            if (!paymentmethod) {
                res.status(404).send({ error: `PaymentMethod with ID ${paymentMethodId} not found` });
                return;
            }
            res.status(200).send(paymentmethod);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}