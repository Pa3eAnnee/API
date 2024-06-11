import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Includes } from "../../database/entities/Includes";
import { createIncludesValidation } from "../../handlers/validators/include-validator";

export const createInclude = (app: Express) => {
	app.post("/includes", async (req: Request, res: Response) => {
		const validation = createIncludesValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const includeRequest = validation.value;
		const includeRepo = AppDataSource.getRepository(Includes);

		try {
			const includeCreated = await includeRepo.save(includeRequest);
			res.status(201).send(includeCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
