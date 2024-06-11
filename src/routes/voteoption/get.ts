import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { VoteOption } from "../../database/entities/VoteOption";

export const getVoteoptions = (app: Express): void => {
	app.get("/voteoptions", async (req: Request, res: Response) => {
		const voteoptionRepo = AppDataSource.getRepository(VoteOption);
		const voteoptions = await voteoptionRepo.find();
		res.status(200).send(voteoptions);
	});

	app.get("/voteoptions/:id", async (req: Request, res: Response) => {
		const voteoptionId = Number.parseInt(req.params.id);
		if (!voteoptionId || isNaN(Number(voteoptionId))) {
			res.status(400).send({ error: "Invalid voteoption ID" });
			return;
		}

		const voteoptionRepo = AppDataSource.getRepository(VoteOption);

		try {
			const voteoption = await voteoptionRepo.findOneBy({ id: voteoptionId });
			if (!voteoption) {
				res
					.status(404)
					.send({ error: `Voteoption with ID ${voteoptionId} not found` });
				return;
			}
			res.status(200).send(voteoption);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
