import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Donation } from "../../database/entities/Donation";

// Delete a donation
export const deleteDonation = (app: Express): void => {
	app.delete("/donations/:id", async (req: Request, res: Response) => {
		const donationId = Number.parseInt(req.params.id);

		if (Number.isNaN(donationId)) {
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

			await donationRepo.delete(donationId);
			res.status(200).send({
				message: `Donation with ID ${donationId} deleted successfully`,
			});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
