import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Includes } from "../../database/entities/Includes";

export const getIncludes = (app: Express): void => {
	app.get("/includes", async (req: Request, res: Response) => {
		const includeRepo = AppDataSource.getRepository(Includes);
		const includes = await includeRepo.find();
		res.status(200).send(includes);
	});

	app.get("/includes/:id", async (req: Request, res: Response) => {
		const includeId = Number.parseInt(req.params.id);
		if (!includeId || Number.isNaN(Number(includeId))) {
			res.status(400).send({ error: "Invalid include ID" });
			return;
		}

		const includeRepo = AppDataSource.getRepository(Includes);

		try {
			const include = await includeRepo.findOneBy({ id: includeId });
			if (!include) {
				res
					.status(404)
					.send({ error: `Include with ID ${includeId} not found` });
				return;
			}
			res.status(200).send(include);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
