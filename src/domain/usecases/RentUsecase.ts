import type { DataSource } from "typeorm";
import { Rent } from "../../database/entities/Rent";
import {
	type CreateRentRequest,
	type UpdateRentRequest,
	createRentValidation,
	updateRentValidation,
} from "../../handlers/validators/rent-validator";

export class RentUsecase {
	constructor(private readonly db: DataSource) {}

	async getRent(id: number): Promise<Rent | null> {
		const repo = this.db.getRepository(Rent);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteRent(id: number): Promise<Rent | null> {
		const repo = this.db.getRepository(Rent);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createRent(rentData: CreateRentRequest): Promise<Rent> {
		// Validate rentData against the schema
		const { error } = createRentValidation.validate(rentData);
		if (error) {
			throw new Error(`Invalid CreateRentRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Rent);
		const newRent = repo.create(rentData);
		return await repo.save(newRent);
	}

	async updateRent(
		id: number,
		rentData: UpdateRentRequest,
	): Promise<Rent | null> {
		// Validate rentData against the schema
		const { error } = updateRentValidation.validate(rentData);
		if (error) {
			throw new Error(`Invalid UpdateRentRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Rent);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		// Update the entity with the new data
		Object.assign(entityFound, rentData);
		return await repo.save(entityFound);
	}
}
