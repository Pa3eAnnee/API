import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Room } from "../../database/entities/Room";

export const getRooms = (app: Express): void => {
	app.get("/rooms", async (req: Request, res: Response) => {
		const roomRepo = AppDataSource.getRepository(Room);
		const rooms = await roomRepo.find();
		res.status(200).send(rooms);
	});

	app.get("/rooms/:id", async (req: Request, res: Response) => {
		const roomId = Number.parseInt(req.params.id);
		if (!roomId || Number.isNaN(Number(roomId))) {
			res.status(400).send({ error: "Invalid room ID" });
			return;
		}

		const roomRepo = AppDataSource.getRepository(Room);

		try {
			const room = await roomRepo.findOneBy({ id: roomId });
			if (!room) {
				res.status(404).send({ error: `Room with ID ${roomId} not found` });
				return;
			}
			res.status(200).send(room);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
