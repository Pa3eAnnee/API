import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { User } from '../../database/entities/User';
import { updateUserValidation } from '../../handlers/validators/user-validator';
import { hash } from 'bcrypt';

export const updateUser = (app: Express): void => {
    app.patch('/users/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = updateUserValidation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        let userRequest = validation.value;

        if (userRequest.password) {
            userRequest = { ...userRequest, password: await hash(userRequest.password, 10) };
        }

        const userRepo = AppDataSource.getRepository(User);

        try {
            const user = await userRepo.findOneBy({ id: userRequest.id });
            if (!user) {
                res.status(404).send({ error: `User with ID ${userRequest.id} not found` });
                return;
            }

            await userRepo.update(userRequest.id, userRequest);
            const updatedUser = await userRepo.findOneBy({ id: userRequest.id });
            res.status(200).send(updatedUser);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}
