import type { DataSource } from "typeorm";
import { VoteTable } from "../database/entities/VoteTable";
import {
	type CreateVoteTableRequest,
	type UpdateVoteTableRequest,
	createVoteTableValidation,
	updateVoteTableValidation,
} from "../handlers/validators/votetable-validator";

export class VoteTableUsecase {
	constructor(private readonly db: DataSource) {}

	async getVoteTable(id: number): Promise<VoteTable | null> {
		const repo = this.db.getRepository(VoteTable);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteVoteTable(id: number): Promise<VoteTable | null> {
		const repo = this.db.getRepository(VoteTable);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createVoteTable(
		voteTableData: CreateVoteTableRequest,
	): Promise<VoteTable> {
		// Validate voteTableData against the schema
		const { error } = createVoteTableValidation.validate(voteTableData);
		if (error) {
			throw new Error(`Invalid CreateVoteTableRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(VoteTable);
		const newVoteTable = repo.create(voteTableData);
		return await repo.save(newVoteTable);
	}

	async updateVoteTable(
		id: number,
		voteTableData: UpdateVoteTableRequest,
	): Promise<VoteTable | null> {
		// Validate voteTableData against the schema
		const { error } = updateVoteTableValidation.validate({ ...voteTableData });
		if (error) {
			throw new Error(`Invalid UpdateVoteTableRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(VoteTable);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		// Update the entity with the new data
		Object.assign(entityFound, voteTableData);
		return await repo.save(entityFound);
	}
}
