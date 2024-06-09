import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Resume } from '../../database/entities/Resume';
import { createResumeValidation } from '../../handlers/validators/resume-validator';

export const createResume = (app: Express) => {
    app.post('/resumes', async (req: Request, res: Response) => {
        const validation = createResumeValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const resumeRequest = validation.value;
        const resumeRepo = AppDataSource.getRepository(Resume);

        try {
            const resumeCreated = await resumeRepo.save(resumeRequest);
            res.status(201).send(resumeCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}