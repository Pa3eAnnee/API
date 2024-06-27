import type { DataSource } from "typeorm";
import { Location } from "../database/entities/Location";
import {
	createLocationValidation,
	updateLocationValidation,
} from "../handlers/validators/location-validator";

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
		const entityFound = await repo.findOne({ id });
		if (!entityFound) return null;
		return entityFound;
	}

	async deleteLocation(id: number): Promise<Location | null> {
		const repo = this.db.getRepository(Location);
		const entityFound = await repo.findOne({ id });
		if (!entityFound) return null;
		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createLocation(locationData: CreateLocationRequest): Promise<Location> {
		const { error } = createLocationValidation.validate(locationData);
		if (error) {
			throw new Error(`Invalid CreateLocationRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Location);
		const newLocation = repo.create(locationData);
		return await repo.save(newLocation);
	}

	async updateLocation(
		id: number,
		locationData: UpdateLocationRequest,
	): Promise<Location | null> {
		const { error } = updateLocationValidation.validate(locationData);
		if (error) {
			throw new Error(`Invalid UpdateLocationRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Location);
		const entityFound = await repo.findOne({ id });
		if (!entityFound) return null;

		if (locationData.room_id !== undefined) {
			entityFound.room_id = locationData.room_id;
		}
		if (locationData.building_id !== undefined) {
			entityFound.building_id = locationData.building_id;
		}
		if (locationData.address_id !== undefined) {
			entityFound.address_id = locationData.address_id;
		}

		return await repo.save(entityFound);
	}
}
