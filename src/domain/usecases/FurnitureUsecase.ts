import { DataSource } from "typeorm";
import { Furniture } from "../../database/entities/Furniture";
import { CreateFurnitureRequest, UpdateFurnitureRequest, createFurnitureValidation, updateFurnitureValidation } from '../../handlers/validators/furniture-validator';

export class FurnitureUsecase {
    constructor(private readonly db: DataSource) { }

    async getFurniture(id: number): Promise<Furniture | null > {
        const repo = this.db.getRepository(Furniture);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null ) return null;
        return entityFound;
    }

    async deleteFurniture(id: number): Promise<Furniture | null> {
        const repo = this.db.getRepository(Furniture);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createFurniture(furnitureData: CreateFurnitureRequest): Promise<Furniture> {
        // Validate furnitureData against the schema
        const { error } = createFurnitureValidation.validate(furnitureData);
        if (error) {
            throw new Error(`Invalid CreateFurnitureRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Furniture);
        const newFurniture = repo.create(furnitureData);
        return await repo.save(newFurniture);
    }

    async updateFurniture(id: number, furnitureData: UpdateFurnitureRequest): Promise<Furniture | null> {
        // Validate furnitureData against the schema
        const { error } = updateFurnitureValidation.validate(furnitureData);
        if (error) {
            throw new Error(`Invalid UpdateFurnitureRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Furniture);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, furnitureData);
        return await repo.save(entityFound);
    }
}
