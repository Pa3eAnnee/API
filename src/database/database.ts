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
	entities: ["dist/src/database/entities/*.js"],
	migrations: ["src/database/migrations/*.js"],
});
