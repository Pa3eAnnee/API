import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Rent } from "../../database/entities/Rent";

export const getRents = (app: Express): void => {
	app.get("/rents", async (req: Request, res: Response) => {
		const rentRepo = AppDataSource.getRepository(Rent);
		const rents = await rentRepo.find();
		res.status(200).send(rents);
	});

	app.get("/rents/:id", async (req: Request, res: Response) => {
		const rentId = Number.parseInt(req.params.id);
		if (!rentId || Number.isNaN(Number(rentId))) {
			res.status(400).send({ error: "Invalid rent ID" });
			return;
		}

		const rentRepo = AppDataSource.getRepository(Rent);

		try {
			const rent = await rentRepo.findOneBy({ id: rentId });
			if (!rent) {
				res.status(404).send({ error: `Rent with ID ${rentId} not found` });
				return;
			}
			res.status(200).send(rent);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
