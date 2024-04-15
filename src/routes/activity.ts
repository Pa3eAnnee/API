import { Express, Request, Response } from 'express';

const mockActivities = [
    {
        id: 1,
        responsable_id: 1,
        title: 'Event 1',
        description: 'Description for Event 1',
        image: 'event_1.png',
        location: 'Location 1',
        date_start: '2024-04-20',
        date_end: '2024-04-22',
        cost: 50
    },
    {
        id: 2,
        responsable_id: 2,
        title: 'Event 2',
        description: 'Description for Event 2',
        image: 'event_2.png',
        location: 'Location 2',
        date_start: '2024-05-10',
        date_end: '2024-05-12',
        cost: 100
    },
];

export const activityRoute = (app: Express): void => {
    app.get('/activities', (req: Request, res: Response) => {
        res.json(mockActivities);
    });
};
