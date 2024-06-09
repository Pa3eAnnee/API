import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { PaymentMethod } from '../../database/entities/PaymentMethod';

// Delete a paymentMethod
export const deletePaymentMethod = (app: Express): void => {
    app.delete('/paymentmethods/:id', async (req: Request, res: Response) => {
        const paymentMethodId = parseInt(req.params.id);

        if (isNaN(paymentMethodId)) {
            res.status(400).send({ error: 'Invalid paymentMethod ID' });
            return;
        }

        const paymentMethodRepo = AppDataSource.getRepository(PaymentMethod);

        try {
            const paymentMethod = await paymentMethodRepo.findOneBy({ id: paymentMethodId });
            if (!paymentMethod) {
                res.status(404).send({ error: `PaymentMethod with ID ${paymentMethodId} not found` });
                return;
            }

            await paymentMethodRepo.delete(paymentMethodId);
            res.status(200).send({ message: `PaymentMethod with ID ${paymentMethodId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}