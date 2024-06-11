import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Debate } from "../../database/entities/Debate";
import { createDebateValidation } from "../../handlers/validators/debate-validator";

export const createDebate = (app: Express) => {
	app.post("/debates", async (req: Request, res: Response) => {
		const validation = createDebateValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const debateRequest = validation.value;
		const debateRepo = AppDataSource.getRepository(Debate);

		try {
			const debateCreated = await debateRepo.save(debateRequest);
			res.status(201).send(debateCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
