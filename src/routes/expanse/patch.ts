import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Expanse } from "../../database/entities/Expanse";
import { updateExpanseValidation } from "../../handlers/validators/expanse-validator";

export const updateExpanse = (app: Express): void => {
	app.patch("/expanses/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateExpanseValidation.validate({
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

		const expanseRequest = validation.value;

		const expanseRepo = AppDataSource.getRepository(Expanse);

		try {
			const expanse = await expanseRepo.findOneBy({ id: expanseRequest.id });
			if (!expanse) {
				res
					.status(404)
					.send({ error: `Expanse with ID ${expanseRequest.id} not found` });
				return;
			}

			await expanseRepo.update(expanseRequest.id, expanseRequest);
			const updatedExpanse = await expanseRepo.findOneBy({
				id: expanseRequest.id,
			});
			res.status(200).send(updatedExpanse);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
