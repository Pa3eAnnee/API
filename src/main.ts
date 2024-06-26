import path from "node:path";
import express from "express";
import { AppDataSource } from "./database/database";
import * as routes from "./routes";
const app = express();
const port = Number(process.env.port || 3003);

const main = async () => {
	app
		.use(express.json())
		.use(express.static(path.join(`${__dirname}/../java-client`)));

	AppDataSource.initialize()
		.then(() => {
			console.log("Connected to database V2");
		})
		.catch((error) => console.log(error));

	for (const routeName of Object.keys(routes)) {
		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		(routes as any)[routeName](app);
	}

	// biome-ignore lint/complexity/noForEach: <explanation>
	// biome-ignore lint/suspicious/noExplicitAny: <explanation>
	Object.keys(routes).forEach((key) => (routes as any)[key](app));

	app.listen(port, () => {
		console.log(`Server is running on port ${port}`);
	});
};

main();
