import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Activity } from "../../database/entities/Activity";

// Delete a Activity
export const deleteActivity = (app: Express): void => {
	app.delete("/activities/:id", async (req: Request, res: Response) => {
		const ActivityId = Number.parseInt(req.params.id);

		if (Number.isNaN(ActivityId)) {
			res.status(400).send({ error: "Invalid Activity ID" });
			return;
		}

		const ActivityRepo = AppDataSource.getRepository(Activity);

		try {
			const Activity = await ActivityRepo.findOneBy({ id: ActivityId });
			if (!Activity) {
				res
					.status(404)
					.send({ error: `Activity with ID ${ActivityId} not found` });
				return;
			}

			await ActivityRepo.delete(ActivityId);
			res.status(200).send({
				message: `Activity with ID ${ActivityId} deleted successfully`,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
