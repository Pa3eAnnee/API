import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Participate } from "../../database/entities/Participate";
import { updateParticipateValidation } from "../../handlers/validators/participate-validator";

export const updateParticipate = (app: Express): void => {
	app.patch("/participates/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateParticipateValidation.validate({
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

		const ParticipateRequest = validation.value;

		const ParticipateRepo = AppDataSource.getRepository(Participate);

		try {
			const Participate = await ParticipateRepo.findOneBy({
				id: ParticipateRequest.id,
			});
			if (!Participate) {
				res
					.status(404)
					.send({
						error: `Participate with ID ${ParticipateRequest.id} not found`,
					});
				return;
			}

			await ParticipateRepo.update(ParticipateRequest.id, ParticipateRequest);
			const updatedParticipate = await ParticipateRepo.findOneBy({
				id: ParticipateRequest.id,
			});
			res.status(200).send(updatedParticipate);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
