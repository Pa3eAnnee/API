import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { RessourceCategory } from "../../database/entities/RessourceCategory";
import { updateRessourceCategoryValidation } from "../../handlers/validators/ressourcecategory-validator";

export const updateRessourceCategory = (app: Express): void => {
	app.patch("/ressourcecategories/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateRessourceCategoryValidation.validate({
			...req.body,
			id: Number.parseInt(req.params.id),
		});

		if (validation.error) {
			res.status(400).send({
				error: validation.error.details
					.map((detail) => detail.message)
					.join(", "),
			});
			return;
		}

		const RessourceCategoryRequest = validation.value;

		const RessourceCategoryRepo =
			AppDataSource.getRepository(RessourceCategory);

		try {
			const RessourceCategory = await RessourceCategoryRepo.findOneBy({
				id: RessourceCategoryRequest.id,
			});
			if (!RessourceCategory) {
				res.status(404).send({
					error: `RessourceCategory with ID ${RessourceCategoryRequest.id} not found`,
				});
				return;
			}

			await RessourceCategoryRepo.update(
				RessourceCategoryRequest.id,
				RessourceCategoryRequest,
			);
			const updatedRessourceCategory = await RessourceCategoryRepo.findOneBy({
				id: RessourceCategoryRequest.id,
			});
			res.status(200).send(updatedRessourceCategory);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
