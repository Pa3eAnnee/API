import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { GeneralAssembly } from "../../database/entities/GeneralAssembly";
import { updateGeneralAssemblyValidation } from "../../handlers/validators/generalassembly-validator";

export const updateGeneralAssembly = (app: Express): void => {
	app.patch("/generalassemblies/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateGeneralAssemblyValidation.validate({
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

		const generalAssemblyRequest = validation.value;

		const generalAssemblyRepo = AppDataSource.getRepository(GeneralAssembly);

		try {
			const generalAssembly = await generalAssemblyRepo.findOneBy({
				id: generalAssemblyRequest.id,
			});
			if (!generalAssembly) {
				res
					.status(404)
					.send({
						error: `GeneralAssembly with ID ${generalAssemblyRequest.id} not found`,
					});
				return;
			}

			await generalAssemblyRepo.update(
				generalAssemblyRequest.id,
				generalAssemblyRequest,
			);
			const updatedGeneralAssembly = await generalAssemblyRepo.findOneBy({
				id: generalAssemblyRequest.id,
			});
			res.status(200).send(updatedGeneralAssembly);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
