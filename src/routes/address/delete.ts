import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Address } from "../../database/entities/Address";

// Delete a address
export const deleteAddress = (app: Express): void => {
	app.delete("/addresses/:id", async (req: Request, res: Response) => {
		const addressId = Number.parseInt(req.params.id);

		if (isNaN(addressId)) {
			res.status(400).send({ error: "Invalid address ID" });
			return;
		}

		const addressRepo = AppDataSource.getRepository(Address);

		try {
			const address = await addressRepo.findOneBy({ id: addressId });
			if (!address) {
				res
					.status(404)
					.send({ error: `Address with ID ${addressId} not found` });
				return;
			}

			await addressRepo.delete(addressId);
			res
				.status(200)
				.send({ message: `Address with ID ${addressId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
