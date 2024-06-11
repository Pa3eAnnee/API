import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Vote } from "../../database/entities/Vote";
import { createVoteValidation } from "../../handlers/validators/vote-validator";

export const createVote = (app: Express) => {
	app.post("/votes", async (req: Request, res: Response) => {
		const validation = createVoteValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const voteRequest = validation.value;
		const voteRepo = AppDataSource.getRepository(Vote);

		try {
			const voteCreated = await voteRepo.save(voteRequest);
			res.status(201).send(voteCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
