import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { createAddressValidation } from '../../handlers/validators/address-validator';
import { Address } from '../../database/entities/Address';


// Create a new address
export const createAddress = (app: Express): void => {
    app.post('/addresses', async (req: Request, res: Response) => {
        const validation = createAddressValidation.validate(req.body);

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const addressRequest = validation.value;
        const addressRepo = AppDataSource.getRepository(Address);

        try {
            const newAddress = addressRepo.create(addressRequest);
            await addressRepo.save(newAddress);
            res.status(201).send(newAddress);
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}