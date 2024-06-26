import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Ressource } from '../../database/entities/Ressource';
import { createRessourceValidation } from '../../handlers/validators/ressource-validator';

export const createRessource = (app: Express) => {
    app.post('/ressources', async (req: Request, res: Response) => {
        const validation = createRessourceValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const RessourceRequest = validation.value;
        const RessourceRepo = AppDataSource.getRepository(Ressource);

        try {
            const RessourceCreated = await RessourceRepo.save(RessourceRequest);
            res.status(201).send(RessourceCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}