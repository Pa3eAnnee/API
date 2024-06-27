import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { RessourceCategory } from "../../database/entities/RessourceCategory";

// Delete a RessourceCategory
export const deleteRessourceCategory = (app: Express): void => {
	app.delete(
		"/ressourcecategories/:id",
		async (req: Request, res: Response) => {
			const RessourceCategoryId = Number.parseInt(req.params.id);

			if (Number.isNaN(RessourceCategoryId)) {
				res.status(400).send({ error: "Invalid RessourceCategory ID" });
				return;
			}

			const RessourceCategoryRepo =
				AppDataSource.getRepository(RessourceCategory);

			try {
				const RessourceCategory = await RessourceCategoryRepo.findOneBy({
					id: RessourceCategoryId,
				});
				if (!RessourceCategory) {
					res.status(404).send({
						error: `RessourceCategory with ID ${RessourceCategoryId} not found`,
					});
					return;
				}

				await RessourceCategoryRepo.delete(RessourceCategoryId);
				res.status(200).send({
					message: `RessourceCategory with ID ${RessourceCategoryId} deleted successfully`,
				});
			} catch (error) {
				console.error(error);
				res.status(500).send({ error: "Internal error" });
			}
		},
	);
};
