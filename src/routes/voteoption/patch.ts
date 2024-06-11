import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { VoteOption } from "../../database/entities/VoteOption";
import { updateVoteOptionValidation } from "../../handlers/validators/voteoption-validator";

export const updateVoteoption = (app: Express): void => {
	app.patch("/voteoptions/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateVoteOptionValidation.validate({
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

		const voteoptionRequest = validation.value;

		const voteoptionRepo = AppDataSource.getRepository(VoteOption);

		try {
			const voteoption = await voteoptionRepo.findOneBy({
				id: voteoptionRequest.id,
			});
			if (!voteoption) {
				res.status(404).send({
					error: `Voteoption with ID ${voteoptionRequest.id} not found`,
				});
				return;
			}

			await voteoptionRepo.update(voteoptionRequest.id, voteoptionRequest);
			const updatedVoteoption = await voteoptionRepo.findOneBy({
				id: voteoptionRequest.id,
			});
			res.status(200).send(updatedVoteoption);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
