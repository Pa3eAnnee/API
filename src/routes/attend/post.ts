import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Attend } from "../../database/entities/Attend";
import { createAttendValidation } from "../../handlers/validators/attend-validator";

export const createAttend = (app: Express) => {
	app.post("/attends", async (req: Request, res: Response) => {
		const validation = createAttendValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const attendRequest = validation.value;
		const attendRepo = AppDataSource.getRepository(Attend);

		try {
			const attendCreated = await attendRepo.save(attendRequest);
			res.status(201).send(attendCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
