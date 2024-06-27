import type { DataSource } from "typeorm";
import { Write } from "../../database/entities/Write";
import {
	type CreateWriteRequest,
	type UpdateWriteRequest,
	createWriteValidation,
	updateWriteValidation,
} from "../../handlers/validators/write-validator";

export class WriteUsecase {
	constructor(private readonly db: DataSource) {}

	async getWrite(id: number): Promise<Write | null> {
		const repo = this.db.getRepository(Write);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteWrite(id: number): Promise<Write | null> {
		const repo = this.db.getRepository(Write);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createWrite(writeData: CreateWriteRequest): Promise<Write> {
		// Validate writeData against the schema
		const { error } = createWriteValidation.validate(writeData);
		if (error) {
			throw new Error(`Invalid CreateWriteRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Write);
		const newWrite = repo.create(writeData);
		return await repo.save(newWrite);
	}

	async updateWrite(
		id: number,
		writeData: UpdateWriteRequest,
	): Promise<Write | null> {
		// Validate writeData against the schema
		const { error } = updateWriteValidation.validate({ ...writeData });
		if (error) {
			throw new Error(`Invalid UpdateWriteRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Write);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		// Update the entity with the new data
		Object.assign(entityFound, writeData);
		return await repo.save(entityFound);
	}
}
