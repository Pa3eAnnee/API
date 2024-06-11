import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Room } from "../../database/entities/Room";

// Delete a room
export const deleteRoom = (app: Express): void => {
	app.delete("/rooms/:id", async (req: Request, res: Response) => {
		const roomId = Number.parseInt(req.params.id);

		if (isNaN(roomId)) {
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

			await roomRepo.delete(roomId);
			res
				.status(200)
				.send({ message: `Room with ID ${roomId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
