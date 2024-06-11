import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Subscription } from "../../database/entities/Subscription";

export const getSubscriptions = (app: Express): void => {
	app.get("/subscriptions", async (req: Request, res: Response) => {
		const subscriptionRepo = AppDataSource.getRepository(Subscription);
		const subscriptions = await subscriptionRepo.find();
		res.status(200).send(subscriptions);
	});

	app.get("/subscriptions/:id", async (req: Request, res: Response) => {
		const subscriptionId = Number.parseInt(req.params.id);
		if (!subscriptionId || Number.isNaN(Number(subscriptionId))) {
			res.status(400).send({ error: "Invalid subscription ID" });
			return;
		}

		const subscriptionRepo = AppDataSource.getRepository(Subscription);

		try {
			const subscription = await subscriptionRepo.findOneBy({
				id: subscriptionId,
			});
			if (!subscription) {
				res
					.status(404)
					.send({ error: `Subscription with ID ${subscriptionId} not found` });
				return;
			}
			res.status(200).send(subscription);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
