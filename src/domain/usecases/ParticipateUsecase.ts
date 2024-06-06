import { DataSource } from "typeorm";
import { Participate } from "../../database/entities/Participate";
import { CreateParticipateRequest, UpdateParticipateRequest, createParticipateValidation, updateParticipateValidation } from '../../handlers/validators/participate-validator';

export class ParticipateUsecase {
    constructor(private readonly db: DataSource) { }

    async getParticipate(id: number): Promise<Participate | null> {
        const repo = this.db.getRepository(Participate);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteParticipate(id: number): Promise<Participate | null> {
        const repo = this.db.getRepository(Participate);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createParticipate(participateData: CreateParticipateRequest): Promise<Participate> {
        // Validate participateData against the schema
        const { error } = createParticipateValidation.validate(participateData);
        if (error) {
            throw new Error(`Invalid CreateParticipateRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Participate);
        const newParticipate = repo.create(participateData);
        return await repo.save(newParticipate);
    }

    async updateParticipate(id: number, participateData: UpdateParticipateRequest): Promise<Participate | null> {
        // Validate participateData against the schema
        const { error } = updateParticipateValidation.validate(participateData);
        if (error) {
            throw new Error(`Invalid UpdateParticipateRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Participate);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, participateData);
        return await repo.save(entityFound);
    }
}
