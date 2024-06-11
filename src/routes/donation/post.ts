import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Donation } from "../../database/entities/Donation";
import { createDonationValidation } from "../../handlers/validators/donation-validator";

export const createDonation = (app: Express) => {
	app.post("/donations", async (req: Request, res: Response) => {
		const validation = createDonationValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const donationRequest = validation.value;
		const donationRepo = AppDataSource.getRepository(Donation);

		try {
			const donationCreated = await donationRepo.save(donationRequest);
			res.status(201).send(donationCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
