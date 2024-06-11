import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Donation } from "../../database/entities/Donation";

export const getDonations = (app: Express): void => {
	app.get("/donations", async (req: Request, res: Response) => {
		const donationRepo = AppDataSource.getRepository(Donation);
		const donations = await donationRepo.find();
		res.status(200).send(donations);
	});

	app.get("/donations/:id", async (req: Request, res: Response) => {
		const donationId = Number.parseInt(req.params.id);
		if (!donationId || isNaN(Number(donationId))) {
			res.status(400).send({ error: "Invalid donation ID" });
			return;
		}

		const donationRepo = AppDataSource.getRepository(Donation);

		try {
			const donation = await donationRepo.findOneBy({ id: donationId });
			if (!donation) {
				res
					.status(404)
					.send({ error: `Donation with ID ${donationId} not found` });
				return;
			}
			res.status(200).send(donation);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
