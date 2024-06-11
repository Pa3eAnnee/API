import fs from "node:fs";
import path from "node:path";
import type { Express, Request, Response } from "express";
export const getLatestVersion = (app: Express) => {
	app.get("/getLatestVersion", (req: Request, res: Response) => {
		const versions = fs.readdirSync(path.join(__dirname, "../java-client"));
		const maxMajor = Math.max(
			...versions.map((v) => Number.parseInt(v.split(".")[0])),
		);
		const firstFiltered = versions.filter(
			(v) => Number.parseInt(v.split(".")[0]) === maxMajor,
		);
		const maxMinor = Math.max(
			...firstFiltered.map((v) => Number.parseInt(v.split(".")[1])),
		);
		const secondFiltered = firstFiltered.filter(
			(v) => Number.parseInt(v.split(".")[1]) === maxMinor,
		);
		const maxPatch = Math.max(
			...secondFiltered.map((v) => Number.parseInt(v.split(".")[2])),
		);
		const thirdFiltered = secondFiltered.filter(
			(v) => Number.parseInt(v.split(".")[2]) === maxPatch,
		);
		res.send(thirdFiltered[0]);
	});
};
