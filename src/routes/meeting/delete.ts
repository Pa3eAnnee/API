import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Meeting } from "../../database/entities/Meeting";

// Delete a Meeting
export const deleteMeeting = (app: Express): void => {
	app.delete("/meetings/:id", async (req: Request, res: Response) => {
		const MeetingId = Number.parseInt(req.params.id);

		if (isNaN(MeetingId)) {
			res.status(400).send({ error: "Invalid Meeting ID" });
			return;
		}

		const MeetingRepo = AppDataSource.getRepository(Meeting);

		try {
			const Meeting = await MeetingRepo.findOneBy({ id: MeetingId });
			if (!Meeting) {
				res
					.status(404)
					.send({ error: `Meeting with ID ${MeetingId} not found` });
				return;
			}

			await MeetingRepo.delete(MeetingId);
			res
				.status(200)
				.send({ message: `Meeting with ID ${MeetingId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
