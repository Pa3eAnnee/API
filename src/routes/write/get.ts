import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Write } from "../../database/entities/Write";

export const getWrites = (app: Express): void => {
	app.get("/writes", async (req: Request, res: Response) => {
		const writeRepo = AppDataSource.getRepository(Write);
		const writes = await writeRepo.find();
		res.status(200).send(writes);
	});

	app.get("/writes/:id", async (req: Request, res: Response) => {
		const writeId = Number.parseInt(req.params.id);
		if (!writeId || isNaN(Number(writeId))) {
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
			res.status(200).send(write);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
