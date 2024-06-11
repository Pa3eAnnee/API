import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { MembershipCard } from "../../database/entities/MembershipCard";
import { createMembershipCardValidation } from "../../handlers/validators/membershipcard-validator";

export const createMembershipCard = (app: Express) => {
	app.post("/membershipcards", async (req: Request, res: Response) => {
		const validation = createMembershipCardValidation.validate(req.body);
		if (validation.error) {
			res.status(400).send(validation.error.details);
			return;
		}

		const membershipCardRequest = validation.value;
		const membershipCardRepo = AppDataSource.getRepository(MembershipCard);

		try {
			const membershipCardCreated = await membershipCardRepo.save(
				membershipCardRequest,
			);
			res.status(201).send(membershipCardCreated);
		} catch (error) {
			res.status(500).send({ error: "Internal error" });
		}
	});
};
