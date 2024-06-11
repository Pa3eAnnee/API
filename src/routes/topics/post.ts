import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Topics } from "../../database/entities/Topics";
import { createTopicsValidation } from "../../handlers/validators/topics-validator";

export const createTopics = (app: Express) => {
	app.post("/topics", async (req: Request, res: Response) => {
		const validation = createTopicsValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const topicsRequest = validation.value;
		const topicsRepo = AppDataSource.getRepository(Topics);

		try {
			const topicsCreated = await topicsRepo.save(topicsRequest);
			res.status(201).send(topicsCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
