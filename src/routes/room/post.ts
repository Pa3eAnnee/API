import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { Room } from '../../database/entities/Room';
import { createRoomValidation } from '../../handlers/validators/room-validator';

export const createRoom = (app: Express) => {
    app.post('/rooms', async (req: Request, res: Response) => {
        const validation = createRoomValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const roomRequest = validation.value;
        const roomRepo = AppDataSource.getRepository(Room);

        try {
            const roomCreated = await roomRepo.save(roomRequest);
            res.status(201).send(roomCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}