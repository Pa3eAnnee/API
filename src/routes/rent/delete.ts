import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Rent } from "../../database/entities/Rent";

// Delete a rent
export const deleteRent = (app: Express): void => {
	app.delete("/rents/:id", async (req: Request, res: Response) => {
		const rentId = Number.parseInt(req.params.id);

		if (Number.isNaN(rentId)) {
			res.status(400).send({ error: "Invalid rent ID" });
			return;
		}

		const rentRepo = AppDataSource.getRepository(Rent);

		try {
			const rent = await rentRepo.findOneBy({ id: rentId });
			if (!rent) {
				res.status(404).send({ error: `Rent with ID ${rentId} not found` });
				return;
			}

			await rentRepo.delete(rentId);
			res
				.status(200)
				.send({ message: `Rent with ID ${rentId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
