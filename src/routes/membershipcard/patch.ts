import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { MembershipCard } from '../../database/entities/MembershipCard';
import { updateMembershipCardValidation } from '../../handlers/validators/membershipcard-validator';

export const updateMembershipCard = (app: Express): void => {
    app.patch('/membershipcards/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateMembershipCardValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const membershipCardRequest = validation.value;

        const membershipCardRepo = AppDataSource.getRepository(MembershipCard);

        try {
            const membershipCard = await membershipCardRepo.findOneBy({ id: membershipCardRequest.id });
            if (!membershipCard) {
                res.status(404).send({ error: `MembershipCard with ID ${membershipCardRequest.id} not found` });
                return;
            }

            await membershipCardRepo.update(membershipCardRequest.id, membershipCardRequest);
            const updatedMembershipCard = await membershipCardRepo.findOneBy({ id: membershipCardRequest.id });
            res.status(200).send(updatedMembershipCard);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}