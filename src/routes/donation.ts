import { Express, Request, Response } from 'express';

const mockDonations = [
    { id: 1, donator_id: 201, amount: 50, currency: 'USD', date: '2024-04-10' },
    { id: 2, donator_id: 202, amount: 100, currency: 'EUR', date: '2024-04-15' },
];

export const donationRoute = (app: Express): void => {
    app.get('/donations', (req: Request, res: Response) => {
        res.json(mockDonations);
    });
};
