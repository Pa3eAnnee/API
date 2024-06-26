import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Activity } from "../../database/entities/Activity";

export const getActivitys = (app: Express): void => {
	app.get("/activities", async (req: Request, res: Response) => {
		const ActivityRepo = AppDataSource.getRepository(Activity);
		const Activitys = await ActivityRepo.find();
		res.status(200).send(Activitys);
	});

	app.get("/activities/:id", async (req: Request, res: Response) => {
		const ActivityId = Number.parseInt(req.params.id);
		if (!ActivityId || Number.isNaN(Number(ActivityId))) {
			res.status(400).send({ error: "Invalid Activity ID" });
			return;
		}

		const ActivityRepo = AppDataSource.getRepository(Activity);

		try {
			const activity = await ActivityRepo.findOneBy({ id: ActivityId });
			if (!activity) {
				res
					.status(404)
					.send({ error: `Activity with ID ${ActivityId} not found` });
				return;
			}
			res.status(200).send(activity);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
