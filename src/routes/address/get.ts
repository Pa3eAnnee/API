import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Address } from "../../database/entities/Address";

// Get all addresss
export const getAddresses = (app: Express): void => {
	app.get("/addresses", async (req: Request, res: Response) => {
		const addressRepo = AppDataSource.getRepository(Address);
		const addresss = await addressRepo.find();
		res.status(200).send(addresss);
	});

	// Get address by ID
	app.get("/addresses/:id", async (req: Request, res: Response) => {
		const addressId = Number.parseInt(req.params.id);

		if (Number.isNaN(addressId)) {
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

			res.status(200).send(address);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
