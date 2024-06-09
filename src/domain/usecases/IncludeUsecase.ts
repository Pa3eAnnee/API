import { DataSource } from "typeorm";
import { GeneralAssembly } from "../../database/entities/GeneralAssembly";
import {
    CreateGeneralAssemblyRequest,
    createGeneralAssemblyValidation, UpdateGeneralAssemblyRequest, updateGeneralAssemblyValidation
} from "../../handlers/validators/generalassembly-validator";

export class GeneralAssemblyUsecase {
    constructor(private readonly db: DataSource) { }

    async getGeneralAssembly(id: number): Promise<GeneralAssembly | null> {
        const repo = this.db.getRepository(GeneralAssembly);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteGeneralAssembly(id: number): Promise<GeneralAssembly | null> {
        const repo = this.db.getRepository(GeneralAssembly);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createGeneralAssembly(generalAssemblyData: CreateGeneralAssemblyRequest): Promise<GeneralAssembly> {
        // Validate generalAssemblyData against the schema
        const { error } = createGeneralAssemblyValidation.validate(generalAssemblyData);
        if (error) {
            throw new Error(`Invalid CreateGeneralAssemblyRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(GeneralAssembly);
        const newGeneralAssembly = repo.create(generalAssemblyData);
        return await repo.save(newGeneralAssembly);
    }

    async updateGeneralAssembly(id: number, generalAssemblyData: UpdateGeneralAssemblyRequest): Promise<GeneralAssembly | null> {
        // Validate generalAssemblyData against the schema
        const { error } = updateGeneralAssemblyValidation.validate({ ...generalAssemblyData });
        if (error) {
            throw new Error(`Invalid UpdateGeneralAssemblyRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(GeneralAssembly);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, generalAssemblyData);
        return await repo.save(entityFound);
    }
}
