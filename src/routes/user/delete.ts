import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { User } from "../../database/entities/User";

export const deleteUser = (app: Express): void => {
	app.delete("/users/:id", async (req: Request, res: Response) => {
		const userId = Number.parseInt(req.params.id);

		if (isNaN(userId)) {
			res.status(400).send({ error: "Invalid user ID" });
			return;
		}

		const userRepo = AppDataSource.getRepository(User);

		try {
			const user = await userRepo.findOneBy({ id: userId });
			if (!user) {
				res.status(404).send({ error: `User with ID ${userId} not found` });
				return;
			}

			await userRepo.delete(userId);
			res
				.status(200)
				.send({ message: `User with ID ${userId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
