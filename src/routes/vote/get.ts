import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Vote } from "../../database/entities/Vote";

export const getVotes = (app: Express): void => {
	app.get("/votes", async (req: Request, res: Response) => {
		const voteRepo = AppDataSource.getRepository(Vote);
		const votes = await voteRepo.find();
		res.status(200).send(votes);
	});

	app.get("/votes/:id", async (req: Request, res: Response) => {
		const voteId = Number.parseInt(req.params.id);
		if (!voteId || isNaN(Number(voteId))) {
			res.status(400).send({ error: "Invalid vote ID" });
			return;
		}

		const voteRepo = AppDataSource.getRepository(Vote);

		try {
			const vote = await voteRepo.findOneBy({ id: voteId });
			if (!vote) {
				res.status(404).send({ error: `Vote with ID ${voteId} not found` });
				return;
			}
			res.status(200).send(vote);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
