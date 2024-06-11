import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Attend } from "../../database/entities/Attend";

export const getAttends = (app: Express): void => {
	app.get("/attends", async (req: Request, res: Response) => {
		const attendRepo = AppDataSource.getRepository(Attend);
		const attends = await attendRepo.find();
		res.status(200).send(attends);
	});

	app.get("/attends/:id", async (req: Request, res: Response) => {
		const attendId = Number.parseInt(req.params.id);
		if (!attendId || isNaN(Number(attendId))) {
			res.status(400).send({ error: "Invalid attend ID" });
			return;
		}

		const attendRepo = AppDataSource.getRepository(Attend);

		try {
			const attend = await attendRepo.findOneBy({ id: attendId });
			if (!attend) {
				res.status(404).send({ error: `Attend with ID ${attendId} not found` });
				return;
			}
			res.status(200).send(attend);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
