import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Furniture } from "../../database/entities/Furniture";

export const getFurnitures = (app: Express): void => {
	app.get("/furnitures", async (req: Request, res: Response) => {
		const furnitureRepo = AppDataSource.getRepository(Furniture);
		const furnitures = await furnitureRepo.find();
		res.status(200).send(furnitures);
	});

	app.get("/furnitures/:id", async (req: Request, res: Response) => {
		const furnitureId = Number.parseInt(req.params.id);
		if (!furnitureId || Number.isNaN(Number(furnitureId))) {
			res.status(400).send({ error: "Invalid furniture ID" });
			return;
		}

		const furnitureRepo = AppDataSource.getRepository(Furniture);

		try {
			const furniture = await furnitureRepo.findOneBy({ id: furnitureId });
			if (!furniture) {
				res
					.status(404)
					.send({ error: `Furniture with ID ${furnitureId} not found` });
				return;
			}
			res.status(200).send(furniture);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
