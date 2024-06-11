import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Building" })
export class Building {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	address_id: number;

	@Column()
	floor: string;

	constructor(id: number, name: string, address_id: number, floor: string) {
		this.id = id;
		this.name = name;
		this.address_id = address_id;
		this.floor = floor;
	}
}
