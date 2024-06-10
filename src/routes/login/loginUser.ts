import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { User } from '../../database/entities/User';
import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import {loginValidation} from "../../handlers/validators/login-validator";

export const login = (app: Express) => {
    app.post('/login', async (req: Request, res: Response) => {
        const validation = loginValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const userRepo = AppDataSource.getRepository(User);
        const user = await userRepo.findOne({ where: { email: req.body.email } });
        if (!user) {
            res.status(401).send({ error: 'Invalid credentials' });
            return;
        }

        const isPasswordValid = await compare(req.body.password, user.password);
        if (!isPasswordValid) {
            res.status(401).send({ error: 'Invalid credentials' });
            return;
        }

        const token = sign({ id: user.id }, process.env.JWT_SECRET || 'secret', { expiresIn: '1h' });
        res.status(200).send({ token });
    });
}
