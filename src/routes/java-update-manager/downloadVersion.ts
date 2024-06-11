import fs from "fs";
import path from "path";
import type { Express, Request, Response } from "express";

export const downloadVersion = (app: Express) => {
	app.get("/downloadVersion/:version", (req: Request, res: Response) => {
		const version = req.params.version;
		const fileName = "java-client.jar";
		const filePath = path.join(
			__dirname,
			`/../java-client/${version}/${fileName}`,
		);

		if (!fs.existsSync(filePath)) {
			res.status(404).send("Version not found");
			return;
		}

		res.download(filePath, fileName, (err) => {
			if (err) {
				console.error("Error downloading file:", err);
				res.status(500).send("Error downloading file");
			}
		});
	});
};
