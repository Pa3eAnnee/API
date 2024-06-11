import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Room } from "../../database/entities/Room";
import { updateRoomValidation } from "../../handlers/validators/room-validator";

export const updateRoom = (app: Express): void => {
	app.patch("/rooms/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateRoomValidation.validate({
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

		const roomRequest = validation.value;

		const roomRepo = AppDataSource.getRepository(Room);

		try {
			const room = await roomRepo.findOneBy({ id: roomRequest.id });
			if (!room) {
				res
					.status(404)
					.send({ error: `Room with ID ${roomRequest.id} not found` });
				return;
			}

			await roomRepo.update(roomRequest.id, roomRequest);
			const updatedRoom = await roomRepo.findOneBy({ id: roomRequest.id });
			res.status(200).send(updatedRoom);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
