import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Agenda } from '../../database/entities/Agenda';
import { createAgendaValidation } from '../../handlers/validators/agenda-validator';

export const createAgenda = (app: Express) => {
    app.post('/agendas', async (req: Request, res: Response) => {
        const validation = createAgendaValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const agendaRequest = validation.value;
        const agendaRepo = AppDataSource.getRepository(Agenda);

        try {
            const agendaCreated = await agendaRepo.save(agendaRequest);
            res.status(201).send(agendaCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}