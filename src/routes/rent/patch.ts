import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Rent } from "../../database/entities/Rent";
import { updateRentValidation } from "../../handlers/validators/rent-validator";

export const updateRent = (app: Express): void => {
	app.patch("/rents/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateRentValidation.validate({
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

		const rentRequest = validation.value;

		const rentRepo = AppDataSource.getRepository(Rent);

		try {
			const rent = await rentRepo.findOneBy({ id: rentRequest.id });
			if (!rent) {
				res
					.status(404)
					.send({ error: `Rent with ID ${rentRequest.id} not found` });
				return;
			}

			await rentRepo.update(rentRequest.id, rentRequest);
			const updatedRent = await rentRepo.findOneBy({ id: rentRequest.id });
			res.status(200).send(updatedRent);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
