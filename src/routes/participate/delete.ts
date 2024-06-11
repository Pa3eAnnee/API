import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Participate } from "../../database/entities/Participate";

// Delete a Participate
export const deleteParticipate = (app: Express): void => {
	app.delete("/participates/:id", async (req: Request, res: Response) => {
		const ParticipateId = Number.parseInt(req.params.id);

		if (isNaN(ParticipateId)) {
			res.status(400).send({ error: "Invalid Participate ID" });
			return;
		}

		const ParticipateRepo = AppDataSource.getRepository(Participate);

		try {
			const Participate = await ParticipateRepo.findOneBy({
				id: ParticipateId,
			});
			if (!Participate) {
				res
					.status(404)
					.send({ error: `Participate with ID ${ParticipateId} not found` });
				return;
			}

			await ParticipateRepo.delete(ParticipateId);
			res
				.status(200)
				.send({
					message: `Participate with ID ${ParticipateId} deleted successfully`,
				});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
