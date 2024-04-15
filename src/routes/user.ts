import { Express, Request, Response } from 'express';

const mockUsers = [
    { id: 1, name: 'Doe', firstname: 'John', birthdate: '1990-01-01', role: 'guest' },
    { id: 2, name: 'Smith', firstname: 'Alice', birthdate: '1985-05-15', role: 'employee' },
    { id: 3, name: 'Johnson', firstname: 'Bob', birthdate: '1978-11-30', role: 'leader' }
];

export const userRoute = (app: Express): void => {
    app.get('/users', (req: Request, res: Response) => {
        res.json(mockUsers);
    });
};
