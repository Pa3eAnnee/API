import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { GeneralAssembly } from "../../database/entities/GeneralAssembly";

export const getGeneralAssemblys = (app: Express): void => {
	app.get("/generalassemblies", async (req: Request, res: Response) => {
		const generalAssemblyRepo = AppDataSource.getRepository(GeneralAssembly);
		const generalAssemblys = await generalAssemblyRepo.find();
		res.status(200).send(generalAssemblys);
	});

	app.get("/generalassemblies/:id", async (req: Request, res: Response) => {
		const generalAssemblyId = Number.parseInt(req.params.id);
		if (!generalAssemblyId || isNaN(Number(generalAssemblyId))) {
			res.status(400).send({ error: "Invalid generalAssembly ID" });
			return;
		}

		const generalAssemblyRepo = AppDataSource.getRepository(GeneralAssembly);

		try {
			const generalassembly = await generalAssemblyRepo.findOneBy({
				id: generalAssemblyId,
			});
			if (!generalassembly) {
				res
					.status(404)
					.send({
						error: `GeneralAssembly with ID ${generalAssemblyId} not found`,
					});
				return;
			}
			res.status(200).send(generalassembly);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
