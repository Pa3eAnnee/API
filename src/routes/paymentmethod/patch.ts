import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { PaymentMethod } from '../../database/entities/PaymentMethod';
import { updatePaymentMethodValidation } from '../../handlers/validators/paymentmethod-validator';

export const updatePaymentMethod = (app: Express): void => {
    app.patch('/paymentmethods/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updatePaymentMethodValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const paymentMethodRequest = validation.value;

        const paymentMethodRepo = AppDataSource.getRepository(PaymentMethod);

        try {
            const paymentMethod = await paymentMethodRepo.findOneBy({ id: paymentMethodRequest.id });
            if (!paymentMethod) {
                res.status(404).send({ error: `PaymentMethod with ID ${paymentMethodRequest.id} not found` });
                return;
            }

            await paymentMethodRepo.update(paymentMethodRequest.id, paymentMethodRequest);
            const updatedPaymentMethod = await paymentMethodRepo.findOneBy({ id: paymentMethodRequest.id });
            res.status(200).send(updatedPaymentMethod);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}