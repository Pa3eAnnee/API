import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { FurnitureCategory } from "../../database/entities/FurnitureCategory";

// Delete a furnitureCategory
export const deleteFurnitureCategory = (app: Express): void => {
	app.delete("/furniturecategorys/:id", async (req: Request, res: Response) => {
		const furnitureCategoryId = Number.parseInt(req.params.id);

		if (Number.isNaN(furnitureCategoryId)) {
			res.status(400).send({ error: "Invalid furnitureCategory ID" });
			return;
		}

		const furnitureCategoryRepo =
			AppDataSource.getRepository(FurnitureCategory);

		try {
			const furnitureCategory = await furnitureCategoryRepo.findOneBy({
				id: furnitureCategoryId,
			});
			if (!furnitureCategory) {
				res.status(404).send({
					error: `FurnitureCategory with ID ${furnitureCategoryId} not found`,
				});
				return;
			}

			await furnitureCategoryRepo.delete(furnitureCategoryId);
			res.status(200).send({
				message: `FurnitureCategory with ID ${furnitureCategoryId} deleted successfully`,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
