import { DataSource } from "typeorm";
import { VoteOption } from "../database/entities/VoteOption";
import {
    CreateVoteOptionRequest,
    createVoteOptionValidation,
    UpdateVoteOptionRequest, updateVoteOptionValidation
} from "../handlers/validators/voteoption-validator";

export class VoteOptionUsecase {
    constructor(private readonly db: DataSource) { }

    async getVoteOption(id: number): Promise<VoteOption | null> {
        const repo = this.db.getRepository(VoteOption);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteVoteOption(id: number): Promise<VoteOption | null> {
        const repo = this.db.getRepository(VoteOption);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createVoteOption(voteOptionData: CreateVoteOptionRequest): Promise<VoteOption> {
        // Validate voteOptionData against the schema
        const { error } = createVoteOptionValidation.validate(voteOptionData);
        if (error) {
            throw new Error(`Invalid CreateVoteOptionRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(VoteOption);
        const newVoteOption = repo.create(voteOptionData);
        return await repo.save(newVoteOption);
    }

    async updateVoteOption(id: number, voteOptionData: UpdateVoteOptionRequest): Promise<VoteOption | null> {
        // Validate voteOptionData against the schema
        const { error } = updateVoteOptionValidation.validate({ ...voteOptionData });
        if (error) {
            throw new Error(`Invalid UpdateVoteOptionRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(VoteOption);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, voteOptionData);
        return await repo.save(entityFound);
    }
}
