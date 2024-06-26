import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Ressource } from '../../database/entities/Ressource';
import { updateRessourceValidation } from '../../handlers/validators/ressource-validator';

export const updateRessource = (app: Express): void => {
    app.patch('/ressources/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateRessourceValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const RessourceRequest = validation.value;

        const RessourceRepo = AppDataSource.getRepository(Ressource);

        try {
            const Ressource = await RessourceRepo.findOneBy({ id: RessourceRequest.id });
            if (!Ressource) {
                res.status(404).send({ error: `Ressource with ID ${RessourceRequest.id} not found` });
                return;
            }

            await RessourceRepo.update(RessourceRequest.id, RessourceRequest);
            const updatedRessource = await RessourceRepo.findOneBy({ id: RessourceRequest.id });
            res.status(200).send(updatedRessource);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}