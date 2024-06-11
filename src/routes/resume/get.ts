import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Resume } from "../../database/entities/Resume";

export const getResumes = (app: Express): void => {
	app.get("/resumes", async (req: Request, res: Response) => {
		const resumeRepo = AppDataSource.getRepository(Resume);
		const resumes = await resumeRepo.find();
		res.status(200).send(resumes);
	});

	app.get("/resumes/:id", async (req: Request, res: Response) => {
		const resumeId = Number.parseInt(req.params.id);
		if (!resumeId || Number.isNaN(Number(resumeId))) {
			res.status(400).send({ error: "Invalid resume ID" });
			return;
		}

		const resumeRepo = AppDataSource.getRepository(Resume);

		try {
			const resume = await resumeRepo.findOneBy({ id: resumeId });
			if (!resume) {
				res.status(404).send({ error: `Resume with ID ${resumeId} not found` });
				return;
			}
			res.status(200).send(resume);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
