import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { User } from "../../database/entities/User";

export const getUsers = (app: Express): void => {
	app.get("/users", async (req: Request, res: Response) => {
		const userRepo = AppDataSource.getRepository(User);
		const users = await userRepo.find();
		res.status(200).send(users);
	});

	app.get("/users/:id", async (req: Request, res: Response) => {
		const userId = req.params.id;
		if (!userId || Number.isNaN(Number(userId))) {
			res.status(400).send({ error: "Invalid user ID" });
			return;
		}

		try {
			const userRepo = AppDataSource.getRepository(User);
			const user = await userRepo.findOneBy({ id: Number.parseInt(userId) });
			if (!user) {
				res.status(404).send({ error: `User with ID ${userId} not found` });
				return;
			}
			res.status(200).send(user);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
