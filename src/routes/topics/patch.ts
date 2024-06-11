import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Topics } from "../../database/entities/Topics";
import { updateTopicsValidation } from "../../handlers/validators/topics-validator";

export const updateTopics = (app: Express): void => {
	app.patch("/topics/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateTopicsValidation.validate({
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

		const topicsRequest = validation.value;

		const topicsRepo = AppDataSource.getRepository(Topics);

		try {
			const topics = await topicsRepo.findOneBy({ id: topicsRequest.id });
			if (!topics) {
				res
					.status(404)
					.send({ error: `Topics with ID ${topicsRequest.id} not found` });
				return;
			}

			await topicsRepo.update(topicsRequest.id, topicsRequest);
			const updatedTopics = await topicsRepo.findOneBy({
				id: topicsRequest.id,
			});
			res.status(200).send(updatedTopics);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
