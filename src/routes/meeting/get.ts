import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Meeting } from "../../database/entities/Meeting";

export const getMeetings = (app: Express): void => {
	app.get("/meetings", async (req: Request, res: Response) => {
		const MeetingRepo = AppDataSource.getRepository(Meeting);
		const Meetings = await MeetingRepo.find();
		res.status(200).send(Meetings);
	});

	app.get("/meetings/:id", async (req: Request, res: Response) => {
		const MeetingId = Number.parseInt(req.params.id);
		if (!MeetingId || isNaN(Number(MeetingId))) {
			res.status(400).send({ error: "Invalid Meeting ID" });
			return;
		}

		try {
			const MeetingRepo = AppDataSource.getRepository(Meeting);
			const meeting = await MeetingRepo.findOneBy({ id: MeetingId });
			if (!Meeting) {
				res
					.status(404)
					.send({ error: `Meeting with ID ${MeetingId} not found` });
				return;
			}
			res.status(200).send(Meeting);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
