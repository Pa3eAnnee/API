import { hash } from "bcrypt";
import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Address } from "../../database/entities/Address";
import { updateAddressValidation } from "../../handlers/validators/address-validator";

// Update an existing address
export const updateAddress = (app: Express): void => {
	app.patch("/addresses/:id", async (req: Request, res: Response) => {
		const validation = updateAddressValidation.validate({
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

		const addressRequest = validation.value;
		const addressRepo = AppDataSource.getRepository(Address);

		try {
			const address = await addressRepo.findOneBy({ id: addressRequest.id });
			if (!address) {
				res
					.status(404)
					.send({ error: `Address with ID ${addressRequest.id} not found` });
				return;
			}

			await addressRepo.update(addressRequest.id, addressRequest);
			const updatedAddress = await addressRepo.findOneBy({
				id: addressRequest.id,
			});
			res.status(200).send(updatedAddress);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
