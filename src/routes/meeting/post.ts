import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Meeting } from "../../database/entities/Meeting";
import { createMeetingValidation } from "../../handlers/validators/meeting-validator";

export const createMeeting = (app: Express) => {
	app.post("/meetings", async (req: Request, res: Response) => {
		const validation = createMeetingValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const MeetingRequest = validation.value;
		const MeetingRepo = AppDataSource.getRepository(Meeting);

		try {
			const MeetingCreated = await MeetingRepo.save(MeetingRequest);
			res.status(201).send(MeetingCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
