import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Furniture } from "../../database/entities/Furniture";
import { createFurnitureValidation } from "../../handlers/validators/furniture-validator";

export const createFurniture = (app: Express) => {
	app.post("/furnitures", async (req: Request, res: Response) => {
		const validation = createFurnitureValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const furnitureRequest = validation.value;
		const furnitureRepo = AppDataSource.getRepository(Furniture);

		try {
			const furnitureCreated = await furnitureRepo.save(furnitureRequest);
			res.status(201).send(furnitureCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
