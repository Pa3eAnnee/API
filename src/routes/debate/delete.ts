import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Debate } from "../../database/entities/Debate";

// Delete a debate
export const deleteDebate = (app: Express): void => {
	app.delete("/debates/:id", async (req: Request, res: Response) => {
		const debateId = Number.parseInt(req.params.id);

		if (Number.isNaN(debateId)) {
			res.status(400).send({ error: "Invalid debate ID" });
			return;
		}

		const debateRepo = AppDataSource.getRepository(Debate);

		try {
			const debate = await debateRepo.findOneBy({ id: debateId });
			if (!debate) {
				res.status(404).send({ error: `Debate with ID ${debateId} not found` });
				return;
			}

			await debateRepo.delete(debateId);
			res
				.status(200)
				.send({ message: `Debate with ID ${debateId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
