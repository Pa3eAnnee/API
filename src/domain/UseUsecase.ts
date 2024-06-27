import { DataSource } from "typeorm";
import { Use } from "../database/entities/Use";
import { createUseValidation, updateUseValidation } from "../handlers/validators/use-validator";

export interface CreateUseRequest {
    activity_id: number;
    ressource_id: number;
}

export interface UpdateUseRequest {
    id: number;
    activity_id?: number;
    ressource_id?: number;
}

export class UseUsecase {
    constructor(private readonly db: DataSource) {}

    async getUse(id: number): Promise<Use | null> {
        const repo = this.db.getRepository(Use);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteUse(id: number): Promise<Use | null> {
        const repo = this.db.getRepository(Use);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createUse(useData: CreateUseRequest): Promise<Use> {
        const { error } = createUseValidation.validate(useData);
        if (error) {
            throw new Error(`Invalid CreateUseRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Use);
        const newUse = repo.create(useData);
        return await repo.save(newUse);
    }

    async updateUse(id: number, useData: UpdateUseRequest): Promise<Use | null> {
        const { error } = updateUseValidation.validate(useData);
        if (error) {
            throw new Error(`Invalid UpdateUseRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Use);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        Object.assign(entityFound, useData);
        return await repo.save(entityFound);
    }
}
