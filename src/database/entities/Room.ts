import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Room" })
export class Room {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	capacity: number;

	@Column()
	image: string;

	@Column()
	building_id: number;

	@Column("simple-array")
	equipment: string[];

	@Column()
	status: string;

	constructor(
		id: number,
		name: string,
		capacity: number,
		image: string,
		building_id: number,
		equipment: string[],
		status: string,
	) {
		this.id = id;
		this.name = name;
		this.capacity = capacity;
		this.image = image;
		this.building_id = building_id;
		this.equipment = equipment;
		this.status = status;
	}
}
