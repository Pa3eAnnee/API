import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Ressource } from "../../database/entities/Ressource";

// Delete a Ressource
export const deleteRessource = (app: Express): void => {
	app.delete("/ressources/:id", async (req: Request, res: Response) => {
		const RessourceId = Number.parseInt(req.params.id);

		if (Number.isNaN(RessourceId)) {
			res.status(400).send({ error: "Invalid Ressource ID" });
			return;
		}

		const RessourceRepo = AppDataSource.getRepository(Ressource);

		try {
			const Ressource = await RessourceRepo.findOneBy({ id: RessourceId });
			if (!Ressource) {
				res
					.status(404)
					.send({ error: `Ressource with ID ${RessourceId} not found` });
				return;
			}

			await RessourceRepo.delete(RessourceId);
			res.status(200).send({
				message: `Ressource with ID ${RessourceId} deleted successfully`,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
