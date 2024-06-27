import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Activity } from "../../database/entities/Activity";
import { updateActivityValidation } from "../../handlers/validators/activity-validator";

export const updateActivity = (app: Express): void => {
	app.patch("/activities/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateActivityValidation.validate({
			...req.body,
			id: Number.parseInt(req.params.id),
		});

		if (validation.error) {
			res.status(400).send({
				error: validation.error.details
					.map((detail) => detail.message)
					.join(", "),
			});
			return;
		}

		const ActivityRequest = validation.value;

		const ActivityRepo = AppDataSource.getRepository(Activity);

		try {
			const Activity = await ActivityRepo.findOneBy({ id: ActivityRequest.id });
			if (!Activity) {
				res
					.status(404)
					.send({ error: `Activity with ID ${ActivityRequest.id} not found` });
				return;
			}

			await ActivityRepo.update(ActivityRequest.id, ActivityRequest);
			const updatedActivity = await ActivityRepo.findOneBy({
				id: ActivityRequest.id,
			});
			res.status(200).send(updatedActivity);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
