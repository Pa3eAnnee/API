import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Use } from "../../database/entities/Use";

// Delete a Use
export const deleteUse = (app: Express): void => {
	app.delete("/uses/:id", async (req: Request, res: Response) => {
		const UseId = Number.parseInt(req.params.id);

		if (Number.isNaN(UseId)) {
			res.status(400).send({ error: "Invalid Use ID" });
			return;
		}

		const UseRepo = AppDataSource.getRepository(Use);

		try {
			const Use = await UseRepo.findOneBy({ id: UseId });
			if (!Use) {
				res.status(404).send({ error: `Use with ID ${UseId} not found` });
				return;
			}

			await UseRepo.delete(UseId);
			res
				.status(200)
				.send({ message: `Use with ID ${UseId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
