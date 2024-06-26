import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Activity } from '../../database/entities/Activity';
import { createActivityValidation } from '../../handlers/validators/activity-validator';

export const createActivity = (app: Express) => {
    app.post('/activities', async (req: Request, res: Response) => {
        const validation = createActivityValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const ActivityRequest = validation.value;
        const ActivityRepo = AppDataSource.getRepository(Activity);

        try {
            const ActivityCreated = await ActivityRepo.save(ActivityRequest);
            res.status(201).send(ActivityCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}