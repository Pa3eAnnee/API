import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { FurnitureCategory } from "../../database/entities/FurnitureCategory";

export const getFurnitureCategorys = (app: Express): void => {
	app.get("/furniturecategorys", async (req: Request, res: Response) => {
		const furnitureCategoryRepo =
			AppDataSource.getRepository(FurnitureCategory);
		const furnitureCategorys = await furnitureCategoryRepo.find();
		res.status(200).send(furnitureCategorys);
	});

	app.get("/furniturecategorys/:id", async (req: Request, res: Response) => {
		const furnitureCategoryId = Number.parseInt(req.params.id);
		if (!furnitureCategoryId || isNaN(Number(furnitureCategoryId))) {
			res.status(400).send({ error: "Invalid furnitureCategory ID" });
			return;
		}

		const furnitureCategoryRepo =
			AppDataSource.getRepository(FurnitureCategory);

		try {
			const furniturecategory = await furnitureCategoryRepo.findOneBy({
				id: furnitureCategoryId,
			});
			if (!furniturecategory) {
				res
					.status(404)
					.send({
						error: `FurnitureCategory with ID ${furnitureCategoryId} not found`,
					});
				return;
			}
			res.status(200).send(furniturecategory);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
