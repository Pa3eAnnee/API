import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Expanse } from "../../database/entities/Expanse";

export const getExpanses = (app: Express): void => {
	app.get("/expanses", async (req: Request, res: Response) => {
		const expanseRepo = AppDataSource.getRepository(Expanse);
		const expanses = await expanseRepo.find();
		res.status(200).send(expanses);
	});

	app.get("/expanses/:id", async (req: Request, res: Response) => {
		const expanseId = Number.parseInt(req.params.id);
		if (!expanseId || Number.isNaN(Number(expanseId))) {
			res.status(400).send({ error: "Invalid expanse ID" });
			return;
		}

		const expanseRepo = AppDataSource.getRepository(Expanse);

		try {
			const expanse = await expanseRepo.findOneBy({ id: expanseId });
			if (!expanse) {
				res
					.status(404)
					.send({ error: `Expanse with ID ${expanseId} not found` });
				return;
			}
			res.status(200).send(expanse);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
