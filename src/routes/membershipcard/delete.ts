import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { MembershipCard } from '../../database/entities/MembershipCard';

// Delete a membershipCard
export const deleteMembershipCard = (app: Express): void => {
    app.delete('/membershipcards/:id', async (req: Request, res: Response) => {
        const membershipCardId = parseInt(req.params.id);

        if (isNaN(membershipCardId)) {
            res.status(400).send({ error: 'Invalid membershipCard ID' });
            return;
        }

        const membershipCardRepo = AppDataSource.getRepository(MembershipCard);

        try {
            const membershipCard = await membershipCardRepo.findOneBy({ id: membershipCardId });
            if (!membershipCard) {
                res.status(404).send({ error: `MembershipCard with ID ${membershipCardId} not found` });
                return;
            }

            await membershipCardRepo.delete(membershipCardId);
            res.status(200).send({ message: `MembershipCard with ID ${membershipCardId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}