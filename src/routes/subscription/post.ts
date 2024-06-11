import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Subscription } from "../../database/entities/Subscription";
import { createSubscriptionValidation } from "../../handlers/validators/subscription-validator";

export const createSubscription = (app: Express) => {
	app.post("/subscriptions", async (req: Request, res: Response) => {
		const validation = createSubscriptionValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const subscriptionRequest = validation.value;
		const subscriptionRepo = AppDataSource.getRepository(Subscription);

		try {
			const subscriptionCreated =
				await subscriptionRepo.save(subscriptionRequest);
			res.status(201).send(subscriptionCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
