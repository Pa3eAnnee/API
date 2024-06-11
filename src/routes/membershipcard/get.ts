import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { MembershipCard } from "../../database/entities/MembershipCard";

export const getMembershipCards = (app: Express): void => {
	app.get("/membershipcards", async (req: Request, res: Response) => {
		const membershipCardRepo = AppDataSource.getRepository(MembershipCard);
		const membershipCards = await membershipCardRepo.find();
		res.status(200).send(membershipCards);
	});

	app.get("/membershipcards/:id", async (req: Request, res: Response) => {
		const membershipCardId = Number.parseInt(req.params.id);
		if (!membershipCardId || Number.isNaN(Number(membershipCardId))) {
			res.status(400).send({ error: "Invalid membershipCard ID" });
			return;
		}

		const membershipCardRepo = AppDataSource.getRepository(MembershipCard);

		try {
			const membershipcard = await membershipCardRepo.findOneBy({
				id: membershipCardId,
			});
			if (!membershipcard) {
				res.status(404).send({
					error: `MembershipCard with ID ${membershipCardId} not found`,
				});
				return;
			}
			res.status(200).send(membershipcard);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
