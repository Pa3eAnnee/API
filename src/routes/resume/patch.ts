import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Resume } from '../../database/entities/Resume';
import { updateResumeValidation } from '../../handlers/validators/resume-validator';

export const updateResume = (app: Express): void => {
    app.patch('/resumes/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateResumeValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const resumeRequest = validation.value;

        const resumeRepo = AppDataSource.getRepository(Resume);

        try {
            const resume = await resumeRepo.findOneBy({ id: resumeRequest.id });
            if (!resume) {
                res.status(404).send({ error: `Resume with ID ${resumeRequest.id} not found` });
                return;
            }

            await resumeRepo.update(resumeRequest.id, resumeRequest);
            const updatedResume = await resumeRepo.findOneBy({ id: resumeRequest.id });
            res.status(200).send(updatedResume);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}