import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Event } from "../../database/entities/Event";

// Delete a event
export const deleteEvent = (app: Express): void => {
	app.delete("/events/:id", async (req: Request, res: Response) => {
		const eventId = Number.parseInt(req.params.id);

		if (isNaN(eventId)) {
			res.status(400).send({ error: "Invalid event ID" });
			return;
		}

		const eventRepo = AppDataSource.getRepository(Event);

		try {
			const event = await eventRepo.findOneBy({ id: eventId });
			if (!event) {
				res.status(404).send({ error: `Event with ID ${eventId} not found` });
				return;
			}

			await eventRepo.delete(eventId);
			res
				.status(200)
				.send({ message: `Event with ID ${eventId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
