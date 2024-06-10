import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { User } from '../../database/entities/User';
import { hash } from 'bcrypt';
import {createUserValidation} from "../../handlers/validators/user-validator";
import {generateValidationErrorMessage} from "../../handlers/validators/generate-validation-message";

export const register = (app: Express): void => {
    app.post('/register', async (req: Request, res: Response) => {
        const validation = createUserValidation.validate(req.body);
        if (validation.error) {
            res.status(400).send(generateValidationErrorMessage(validation.error.details));
            return;
        }

        let userRequest = validation.value;
        userRequest = { ...userRequest, password: await hash(userRequest.password, 10) };
        const userRepo = AppDataSource.getRepository(User);

        // Verify if the email is already in use
        const user = await userRepo.find({ where: { email: userRequest.email } });

        if (user.length > 0) {
            res.status(400).send({ error: 'Email already in use' });
            return;
        }

        try {
            const userCreated = await userRepo.save(userRequest);
            res.status(201).send(userCreated);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}
