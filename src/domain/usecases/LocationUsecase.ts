import type { DataSource } from "typeorm";
import { Location } from "../../database/entities/Location";

export interface CreateLocationRequest {
	room_id?: number;
	building_id?: number;
	address_id?: number;
}

export interface UpdateLocationRequest {
	id: number;
	room_id?: number;
	building_id?: number;
	address_id?: number;
}

export class LocationUsecase {
	constructor(private readonly db: DataSource) {}

	async getLocation(id: number): Promise<Location | null> {
		const repo = this.db.getRepository(Location);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteLocation(id: number): Promise<Location | null> {
		const repo = this.db.getRepository(Location);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createLocation(data: CreateLocationRequest): Promise<Location> {
		const repo = this.db.getRepository(Location);
		const newLocation = repo.create(data);
		return await repo.save(newLocation);
	}

	async updateLocation(id: number, data: UpdateLocationRequest): Promise<Location | null> {
		const repo = this.db.getRepository(Location);
		let entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		entityFound = { ...entityFound, ...data };
		return await repo.save(entityFound);
	}
}
