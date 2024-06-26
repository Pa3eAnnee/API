import { DataSource } from "typeorm";
import { RessourceCategory } from "../database/entities/RessourceCategory";

export interface UpdateRessourceCategoryRequest {
    // Add your request fields here
}

export class RessourceCategoryUsecase {
    constructor(private readonly db: DataSource) { }

    async getRessourceCategory(id: number): Promise<RessourceCategory | null > {
        const repo = this.db.getRepository(RessourceCategory);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null ) return null;
        return entityFound;
    }

    async deleteRessourceCategory(id: number): Promise<RessourceCategory | null> {
        const repo = this.db.getRepository(RessourceCategory);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }
}