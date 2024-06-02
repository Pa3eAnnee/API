import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { User } from '../../database/entities/User';
import { hash } from 'bcrypt';
import { createUserValidation } from '../../handlers/validators/user-validator';


export const createUser = (app: Express) => {
    app.post('/users', async (req: Request, res: Response) => {
        const validation = createUserValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        let userRequest = validation.value;
        userRequest = { ...userRequest, password: await hash(userRequest.password, 10) };
        const userRepo = AppDataSource.getRepository(User);

        try {
            const userCreated = await userRepo.save(userRequest);
            res.status(201).send(userCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}