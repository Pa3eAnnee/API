import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Subscription } from '../../database/entities/Subscription';
import { updateSubscriptionValidation } from '../../handlers/validators/subscription-validator';

export const updateSubscription = (app: Express): void => {
    app.patch('/subscriptions/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateSubscriptionValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const subscriptionRequest = validation.value;

        const subscriptionRepo = AppDataSource.getRepository(Subscription);

        try {
            const subscription = await subscriptionRepo.findOneBy({ id: subscriptionRequest.id });
            if (!subscription) {
                res.status(404).send({ error: `Subscription with ID ${subscriptionRequest.id} not found` });
                return;
            }

            await subscriptionRepo.update(subscriptionRequest.id, subscriptionRequest);
            const updatedSubscription = await subscriptionRepo.findOneBy({ id: subscriptionRequest.id });
            res.status(200).send(updatedSubscription);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}