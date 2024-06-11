import type { DataSource } from "typeorm";
import { ExpanseCategory } from "../database/entities/ExpanseCategory";
import {
	type CreateExpanseCategoryRequest,
	type UpdateExpanseCategoryRequest,
	createExpanseCategoryValidation,
	updateExpanseCategoryValidation,
} from "../handlers/validators/expansecategory-validator";

export class ExpanseCategoryUsecase {
	constructor(private readonly db: DataSource) {}

	async getExpanseCategory(id: number): Promise<ExpanseCategory | null> {
		const repo = this.db.getRepository(ExpanseCategory);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteExpanseCategory(id: number): Promise<ExpanseCategory | null> {
		const repo = this.db.getRepository(ExpanseCategory);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createExpanseCategory(
		expanseCategoryData: CreateExpanseCategoryRequest,
	): Promise<ExpanseCategory> {
		// Validate expanseCategoryData against the schema
		const { error } =
			createExpanseCategoryValidation.validate(expanseCategoryData);
		if (error) {
			throw new Error(
				`Invalid CreateExpanseCategoryRequest data: ${error.message}`,
			);
		}

		const repo = this.db.getRepository(ExpanseCategory);
		const newExpanseCategory = repo.create(expanseCategoryData);
		return await repo.save(newExpanseCategory);
	}

	async updateExpanseCategory(
		id: number,
		expanseCategoryData: UpdateExpanseCategoryRequest,
	): Promise<ExpanseCategory | null> {
		// Validate expanseCategoryData against the schema
		const { error } = updateExpanseCategoryValidation.validate({
			...expanseCategoryData,
		});
		if (error) {
			throw new Error(
				`Invalid UpdateExpanseCategoryRequest data: ${error.message}`,
			);
		}

		const repo = this.db.getRepository(ExpanseCategory);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		// Update the entity with the new data
		Object.assign(entityFound, expanseCategoryData);
		return await repo.save(entityFound);
	}
}
