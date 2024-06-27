import type { DataSource } from "typeorm";
import { Topics } from "../../database/entities/Topics";
import {
	type CreateTopicsRequest,
	type UpdateTopicsRequest,
	createTopicsValidation,
	updateTopicsValidation,
} from "../../handlers/validators/topics-validator";

export class TopicsUsecase {
	constructor(private readonly db: DataSource) {}

	async getTopics(id: number): Promise<Topics | null> {
		const repo = this.db.getRepository(Topics);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteTopics(id: number): Promise<Topics | null> {
		const repo = this.db.getRepository(Topics);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createTopics(topicsData: CreateTopicsRequest): Promise<Topics> {
		// Validate topicsData against the schema
		const { error } = createTopicsValidation.validate(topicsData);
		if (error) {
			throw new Error(`Invalid CreateTopicsRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Topics);
		const newTopics = repo.create(topicsData);
		return await repo.save(newTopics);
	}

	async updateTopics(
		id: number,
		topicsData: UpdateTopicsRequest,
	): Promise<Topics | null> {
		// Validate topicsData against the schema
		const { error } = updateTopicsValidation.validate({ ...topicsData });
		if (error) {
			throw new Error(`Invalid UpdateTopicsRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Topics);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		// Update the entity with the new data
		Object.assign(entityFound, topicsData);
		return await repo.save(entityFound);
	}
}
