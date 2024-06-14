import { DataSource } from "typeorm";

export const AppDataSource = new DataSource({
	type: "postgres",
	host: "db",
	port: 5432,
	username: "odm_user",
	password: "odm_password",
	database: "odm",
	logging: true,
	synchronize: true,
	entities: [
		process.env.NODE_ENV === "dev"
			? "src/database/entities/*.ts"
			: "dist/src/database/entities/*.js",
	],
	migrations: [
		process.env.NODE_ENV === "dev"
			? "src/database/migrations/*.ts"
			: "dist/src/database/migrations/*.js",
	],
});
