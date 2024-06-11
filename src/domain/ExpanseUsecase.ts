import type { DataSource } from "typeorm";
import { Expanse } from "../database/entities/Expanse";
import {
	type CreateExpanseRequest,
	type UpdateExpanseRequest,
	createExpanseValidation,
	updateExpanseValidation,
} from "../handlers/validators/expanse-validator";

export class ExpanseUsecase {
	constructor(private readonly db: DataSource) {}

	async getExpanse(id: number): Promise<Expanse | null> {
		const repo = this.db.getRepository(Expanse);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteExpanse(id: number): Promise<Expanse | null> {
		const repo = this.db.getRepository(Expanse);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createExpanse(expanseData: CreateExpanseRequest): Promise<Expanse> {
		// Validate expanseData against the schema
		const { error } = createExpanseValidation.validate(expanseData);
		if (error) {
			throw new Error(`Invalid CreateExpanseRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Expanse);
		const newExpanse = repo.create(expanseData);
		return await repo.save(newExpanse);
	}

	async updateExpanse(
		id: number,
		expanseData: UpdateExpanseRequest,
	): Promise<Expanse | null> {
		// Validate expanseData against the schema
		const { error } = updateExpanseValidation.validate({ ...expanseData });
		if (error) {
			throw new Error(`Invalid UpdateExpanseRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Expanse);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		// Update the entity with the new data
		Object.assign(entityFound, expanseData);
		return await repo.save(entityFound);
	}
}
