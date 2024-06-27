import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Location" })
export class Location {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({ nullable: true })
	room_id: number;

	@Column({ nullable: true })
	building_id: number;

	@Column({ nullable: true })
	address_id: number;

	constructor(
		id: number,
		room_id: number,
		building_id: number,
		address_id: number,
	) {
		this.id = id;
		this.room_id = room_id;
		this.building_id = building_id;
		this.address_id = address_id;
	}
}
