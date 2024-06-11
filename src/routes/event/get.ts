import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Event } from "../../database/entities/Event";

export const getEvents = (app: Express): void => {
	app.get("/events", async (req: Request, res: Response) => {
		const eventRepo = AppDataSource.getRepository(Event);
		const events = await eventRepo.find();
		res.status(200).send(events);
	});

	app.get("/events/:id", async (req: Request, res: Response) => {
		const eventId = Number.parseInt(req.params.id);
		if (!eventId || Number.isNaN(Number(eventId))) {
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
			res.status(200).send(event);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
