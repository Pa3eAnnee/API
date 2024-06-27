import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Ressource } from "../../database/entities/Ressource";

export const getRessources = (app: Express): void => {
	app.get("/ressources", async (req: Request, res: Response) => {
		const RessourceRepo = AppDataSource.getRepository(Ressource);
		const Ressources = await RessourceRepo.find();
		res.status(200).send(Ressources);
	});

	app.get("/ressources/:id", async (req: Request, res: Response) => {
		const RessourceId = Number.parseInt(req.params.id);
		if (!RessourceId || Number.isNaN(Number(RessourceId))) {
			res.status(400).send({ error: "Invalid Ressource ID" });
			return;
		}

		const RessourceRepo = AppDataSource.getRepository(Ressource);

		try {
			const ressource = await RessourceRepo.findOneBy({ id: RessourceId });
			if (!ressource) {
				res
					.status(404)
					.send({ error: `Ressource with ID ${RessourceId} not found` });
				return;
			}
			res.status(200).send(ressource);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
