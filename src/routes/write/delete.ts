import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Write } from "../../database/entities/Write";

// Delete a write
export const deleteWrite = (app: Express): void => {
	app.delete("/writes/:id", async (req: Request, res: Response) => {
		const writeId = Number.parseInt(req.params.id);

		if (isNaN(writeId)) {
			res.status(400).send({ error: "Invalid write ID" });
			return;
		}

		const writeRepo = AppDataSource.getRepository(Write);

		try {
			const write = await writeRepo.findOneBy({ id: writeId });
			if (!write) {
				res.status(404).send({ error: `Write with ID ${writeId} not found` });
				return;
			}

			await writeRepo.delete(writeId);
			res
				.status(200)
				.send({ message: `Write with ID ${writeId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
