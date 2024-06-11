import type { Express, Request, Response } from "express";
export const helloRoute = (app: Express): void => {
	app.get("/hello", (req: Request, res: Response) => {
		res.send("Hello !");
	});
};
