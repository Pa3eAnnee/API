import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Write } from "../../database/entities/Write";
import { createWriteValidation } from "../../handlers/validators/write-validator";

export const createWrite = (app: Express) => {
	app.post("/writes", async (req: Request, res: Response) => {
		const validation = createWriteValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const writeRequest = validation.value;
		const writeRepo = AppDataSource.getRepository(Write);

		try {
			const writeCreated = await writeRepo.save(writeRequest);
			res.status(201).send(writeCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
