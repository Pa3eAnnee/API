import type { DataSource } from "typeorm";
import { Vote } from "../database/entities/Vote";
import {
	type CreateVoteRequest,
	type UpdateVoteRequest,
	createVoteValidation,
	updateVoteValidation,
} from "../handlers/validators/vote-validator";

export class VoteUsecase {
	constructor(private readonly db: DataSource) {}

	async getVote(id: number): Promise<Vote | null> {
		const repo = this.db.getRepository(Vote);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteVote(id: number): Promise<Vote | null> {
		const repo = this.db.getRepository(Vote);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createVote(voteData: CreateVoteRequest): Promise<Vote> {
		// Validate voteData against the schema
		const { error } = createVoteValidation.validate(voteData);
		if (error) {
			throw new Error(`Invalid CreateVoteRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Vote);
		const newVote = repo.create(voteData);
		return await repo.save(newVote);
	}

	async updateVote(
		id: number,
		voteData: UpdateVoteRequest,
	): Promise<Vote | null> {
		// Validate voteData against the schema
		const { error } = updateVoteValidation.validate({ ...voteData });
		if (error) {
			throw new Error(`Invalid UpdateVoteRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Vote);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		// Update the entity with the new data
		Object.assign(entityFound, voteData);
		return await repo.save(entityFound);
	}
}
