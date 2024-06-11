import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Participate } from "../../database/entities/Participate";
import { createParticipateValidation } from "../../handlers/validators/participate-validator";

export const createParticipate = (app: Express) => {
	app.post("/participates", async (req: Request, res: Response) => {
		const validation = createParticipateValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const ParticipateRequest = validation.value;
		const ParticipateRepo = AppDataSource.getRepository(Participate);

		try {
			const ParticipateCreated = await ParticipateRepo.save(ParticipateRequest);
			res.status(201).send(ParticipateCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
