import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Meeting } from "../../database/entities/Meeting";
import { updateMeetingValidation } from "../../handlers/validators/meeting-validator";

export const updateMeeting = (app: Express): void => {
	app.patch("/meetings/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateMeetingValidation.validate({
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

		const MeetingRequest = validation.value;

		const MeetingRepo = AppDataSource.getRepository(Meeting);

		try {
			const Meeting = await MeetingRepo.findOneBy({ id: MeetingRequest.id });
			if (!Meeting) {
				res
					.status(404)
					.send({ error: `Meeting with ID ${MeetingRequest.id} not found` });
				return;
			}

			await MeetingRepo.update(MeetingRequest.id, MeetingRequest);
			const updatedMeeting = await MeetingRepo.findOneBy({
				id: MeetingRequest.id,
			});
			res.status(200).send(updatedMeeting);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
