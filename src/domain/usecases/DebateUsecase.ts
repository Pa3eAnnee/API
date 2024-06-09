import { DataSource } from "typeorm";
import { Debate } from "../../database/entities/Debate";
import { CreateDebateRequest, UpdateDebateRequest, createDebateValidation, updateDebateValidation } from '../../handlers/validators/debate-validator';

export class DebateUsecase {
    constructor(private readonly db: DataSource) { }

    async getDebate(id: number): Promise<Debate | null> {
        const repo = this.db.getRepository(Debate);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteDebate(id: number): Promise<Debate | null> {
        const repo = this.db.getRepository(Debate);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createDebate(debateData: CreateDebateRequest): Promise<Debate> {
        // Validate debateData against the schema
        const { error } = createDebateValidation.validate(debateData);
        if (error) {
            throw new Error(`Invalid CreateDebateRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Debate);
        const newDebate = repo.create(debateData);
        return await repo.save(newDebate);
    }

    async updateDebate(id: number, debateData: UpdateDebateRequest): Promise<Debate | null> {
        // Validate debateData against the schema
        const { error } = updateDebateValidation.validate({ id, ...debateData });
        if (error) {
            throw new Error(`Invalid UpdateDebateRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Debate);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, debateData);
        return await repo.save(entityFound);
    }
}
