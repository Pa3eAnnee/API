import { hash } from "bcrypt";
import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Building } from "../../database/entities/Building";
import { updateBuildingValidation } from "../../handlers/validators/building-validator";

// Update an existing building
export const updateBuilding = (app: Express): void => {
	app.patch("/buildings/:id", async (req: Request, res: Response) => {
		const validation = updateBuildingValidation.validate({
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

		const buildingRequest = validation.value;
		const buildingRepo = AppDataSource.getRepository(Building);

		try {
			const building = await buildingRepo.findOneBy({ id: buildingRequest.id });
			if (!building) {
				res
					.status(404)
					.send({ error: `Building with ID ${buildingRequest.id} not found` });
				return;
			}

			await buildingRepo.update(buildingRequest.id, buildingRequest);
			const updatedBuilding = await buildingRepo.findOneBy({
				id: buildingRequest.id,
			});
			res.status(200).send(updatedBuilding);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
