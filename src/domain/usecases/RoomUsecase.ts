import { string } from "joi";
import type { DataSource } from "typeorm";
import { Room } from "../../database/entities/Room";

export interface CreateRoomRequest {
	name: string;
	capacity: number;
	image: string;
	building_id: number;
	equipment: string[];
	status: string;
}

export interface UpdateRoomRequest {
	name?: string;
	capacity?: number;
	image?: string;
	building_id?: number;
	equipment?: string[];
	string?: string;
}

export class RoomUsecase {
	constructor(private readonly db: DataSource) {}

	async getRoom(id: number): Promise<Room | null> {
		const repo = this.db.getRepository(Room);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteRoom(id: number): Promise<Room | null> {
		const repo = this.db.getRepository(Room);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}

	async createRoom(data: CreateRoomRequest): Promise<Room> {
		const repo = this.db.getRepository(Room);
		const newRoom = repo.create(data);
		return await repo.save(newRoom);
	}

	async updateRoom(id: number, data: UpdateRoomRequest): Promise<Room | null> {
		const repo = this.db.getRepository(Room);
		let entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		entityFound = { ...entityFound, ...data };
		return await repo.save(entityFound);
	}
}
