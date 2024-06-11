import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Rent } from "../../database/entities/Rent";
import { createRentValidation } from "../../handlers/validators/rent-validator";

export const createRent = (app: Express) => {
	app.post("/rents", async (req: Request, res: Response) => {
		const validation = createRentValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const rentRequest = validation.value;
		const rentRepo = AppDataSource.getRepository(Rent);

		try {
			const rentCreated = await rentRepo.save(rentRequest);
			res.status(201).send(rentCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
