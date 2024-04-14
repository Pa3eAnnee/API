import {Express, Request, Response} from "express";
import fs from 'fs';
import path from 'path';
export const getLatestVersion = (app: Express) => {
    app.get('/getLatestVersion', (req: Request, res: Response) => {
        const versions = fs.readdirSync(path.join(__dirname, '../java-client'));
        const maxMajor = Math.max(...versions.map(v => parseInt(v.split('.')[0])));
        const firstFiltered = versions.filter(v => parseInt(v.split('.')[0]) === maxMajor);
        const maxMinor = Math.max(...firstFiltered.map(v => parseInt(v.split('.')[1])));
        const secondFiltered = firstFiltered.filter(v => parseInt(v.split('.')[1]) === maxMinor);
        const maxPatch = Math.max(...secondFiltered.map(v => parseInt(v.split('.')[2])));
        const thirdFiltered = secondFiltered.filter(v => parseInt(v.split('.')[2]) === maxPatch);
        res.send(thirdFiltered[0]);
    });
}