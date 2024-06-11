import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Building } from "../../database/entities/Building";

// Delete a building
export const deleteBuilding = (app: Express): void => {
	app.delete("/buildings/:id", async (req: Request, res: Response) => {
		const buildingId = Number.parseInt(req.params.id);

		if (isNaN(buildingId)) {
			res.status(400).send({ error: "Invalid building ID" });
			return;
		}

		const buildingRepo = AppDataSource.getRepository(Building);

		try {
			const building = await buildingRepo.findOneBy({ id: buildingId });
			if (!building) {
				res
					.status(404)
					.send({ error: `Building with ID ${buildingId} not found` });
				return;
			}

			await buildingRepo.delete(buildingId);
			res
				.status(200)
				.send({
					message: `Building with ID ${buildingId} deleted successfully`,
				});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
