import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { GeneralAssembly } from '../../database/entities/GeneralAssembly';
import { createGeneralAssemblyValidation } from '../../handlers/validators/generalassembly-validator';

export const createGeneralAssembly = (app: Express) => {
    app.post('/generalassemblies', async (req: Request, res: Response) => {
        const validation = createGeneralAssemblyValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const generalAssemblyRequest = validation.value;
        const generalAssemblyRepo = AppDataSource.getRepository(GeneralAssembly);

        try {
            const generalAssemblyCreated = await generalAssemblyRepo.save(generalAssemblyRequest);
            res.status(201).send(generalAssemblyCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}