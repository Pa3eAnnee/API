import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Resume } from "../../database/entities/Resume";

// Delete a resume
export const deleteResume = (app: Express): void => {
	app.delete("/resumes/:id", async (req: Request, res: Response) => {
		const resumeId = Number.parseInt(req.params.id);

		if (isNaN(resumeId)) {
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

			await resumeRepo.delete(resumeId);
			res
				.status(200)
				.send({ message: `Resume with ID ${resumeId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
