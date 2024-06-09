import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Agenda } from '../../database/entities/Agenda';

export const getAgendas = (app: Express): void => {
    app.get('/agendas', async (req: Request, res: Response) => {
        const agendaRepo = AppDataSource.getRepository(Agenda);
        const agendas = await agendaRepo.find();
        res.status(200).send(agendas);
    });

    app.get('/agendas/:id', async (req: Request, res: Response) => {
        const agendaId = parseInt(req.params.id);
        if (!agendaId || isNaN(Number(agendaId))) {
            res.status(400).send({ error: 'Invalid agenda ID' });
            return;
        }

        const agendaRepo = AppDataSource.getRepository(Agenda);

        try {
            const agenda = await agendaRepo.findOneBy({ id: agendaId });
            if (!agenda) {
                res.status(404).send({ error: `Agenda with ID ${agendaId} not found` });
                return;
            }
            res.status(200).send(agenda);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}