import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Subscription } from "../../database/entities/Subscription";

// Delete a subscription
export const deleteSubscription = (app: Express): void => {
	app.delete("/subscriptions/:id", async (req: Request, res: Response) => {
		const subscriptionId = Number.parseInt(req.params.id);

		if (Number.isNaN(subscriptionId)) {
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

			await subscriptionRepo.delete(subscriptionId);
			res.status(200).send({
				message: `Subscription with ID ${subscriptionId} deleted successfully`,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
