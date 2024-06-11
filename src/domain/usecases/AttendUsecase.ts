import type { DataSource } from "typeorm";
import { Attend } from "../../database/entities/Attend";
import {
	type CreateAttendRequest,
	type UpdateAttendRequest,
	createAttendValidation,
	updateAttendValidation,
} from "../../handlers/validators/attend-validator";

export class AttendUsecase {
	constructor(private readonly db: DataSource) {}

	async getAttend(id: number): Promise<Attend | null> {
		const repo = this.db.getRepository(Attend);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteAttend(id: number): Promise<Attend | null> {
		const repo = this.db.getRepository(Attend);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createAttend(attendData: CreateAttendRequest): Promise<Attend> {
		// Validate attendData against the schema
		const { error } = createAttendValidation.validate(attendData);
		if (error) {
			throw new Error(`Invalid CreateAttendRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Attend);
		const newAttend = repo.create(attendData);
		return await repo.save(newAttend);
	}

	async updateAttend(
		id: number,
		attendData: UpdateAttendRequest,
	): Promise<Attend | null> {
		// Validate attendData against the schema
		const { error } = updateAttendValidation.validate({ ...attendData });
		if (error) {
			throw new Error(`Invalid UpdateAttendRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Attend);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		// Update the entity with the new data
		Object.assign(entityFound, attendData);
		return await repo.save(entityFound);
	}
}
