import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Donation } from "../../database/entities/Donation";
import { updateDonationValidation } from "../../handlers/validators/donation-validator";

export const updateDonation = (app: Express): void => {
	app.patch("/donations/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateDonationValidation.validate({
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

		const donationRequest = validation.value;

		const donationRepo = AppDataSource.getRepository(Donation);

		try {
			const donation = await donationRepo.findOneBy({ id: donationRequest.id });
			if (!donation) {
				res
					.status(404)
					.send({ error: `Donation with ID ${donationRequest.id} not found` });
				return;
			}

			await donationRepo.update(donationRequest.id, donationRequest);
			const updatedDonation = await donationRepo.findOneBy({
				id: donationRequest.id,
			});
			res.status(200).send(updatedDonation);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
