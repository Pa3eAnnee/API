import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Includes } from '../../database/entities/Includes';
import {updateIncludesValidation} from "../../handlers/validators/include-validator";

export const updateInclude = (app: Express): void => {
    app.patch('/includes/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateIncludesValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const includeRequest = validation.value;

        const includeRepo = AppDataSource.getRepository(Includes);

        try {
            const include = await includeRepo.findOneBy({ id: includeRequest.id });
            if (!include) {
                res.status(404).send({ error: `Include with ID ${includeRequest.id} not found` });
                return;
            }

            await includeRepo.update(includeRequest.id, includeRequest);
            const updatedInclude = await includeRepo.findOneBy({ id: includeRequest.id });
            res.status(200).send(updatedInclude);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}