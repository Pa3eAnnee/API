import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Debate } from "../../database/entities/Debate";
import { updateDebateValidation } from "../../handlers/validators/debate-validator";

export const updateDebate = (app: Express): void => {
	app.patch("/debates/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateDebateValidation.validate({
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

		const debateRequest = validation.value;

		const debateRepo = AppDataSource.getRepository(Debate);

		try {
			const debate = await debateRepo.findOneBy({ id: debateRequest.id });
			if (!debate) {
				res
					.status(404)
					.send({ error: `Debate with ID ${debateRequest.id} not found` });
				return;
			}

			await debateRepo.update(debateRequest.id, debateRequest);
			const updatedDebate = await debateRepo.findOneBy({
				id: debateRequest.id,
			});
			res.status(200).send(updatedDebate);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
