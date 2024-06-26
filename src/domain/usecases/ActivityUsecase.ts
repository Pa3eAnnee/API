import { DataSource } from "typeorm";
import { Activity } from "../../database/entities/Activity";
import { updateActivityValidation } from "../../handlers/validators/activity-validator";

export interface UpdateActivityRequest {
	id: number;
	title?: string;
	description?: string;
	image?: string;
	date_start?: Date;
	date_end?: Date;
	status?: string;
	type?: string;
	organizer_id?: number;
	location_id?: number;
}
export class ActivityUsecase {
	constructor(private readonly db: DataSource) {}

	async getActivity(id: number): Promise<Activity | null> {
		const repo = this.db.getRepository(Activity);
		const entityFound = await repo.findOneBy({ id });
		if (!entityFound) return null;
		return entityFound;
	}

	async deleteActivity(id: number): Promise<Activity | null> {
		const repo = this.db.getRepository(Activity);
		const entityFound = await repo.findOneBy({ id });
		if (!entityFound) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async updateActivity(
		id: number,
		updatedFields: UpdateActivityRequest,
	): Promise<Activity | null> {
		// Validate updatedFields against the schema
		const { error } = updateActivityValidation.validate(updatedFields);
		if (error) {
			throw new Error(`Invalid UpdateActivityRequest data: ${error.message}`);
		}

		const repo = this.db.getRepository(Activity);
		const entityFound = await repo.findOneBy({ id });
		if (!entityFound) return null;

		// Update the entity with the new data
		Object.assign(entityFound, updatedFields);
		await repo.save(entityFound);
		return entityFound;
	}
}
