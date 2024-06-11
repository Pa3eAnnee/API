import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Rent" })
export class Rent {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	furniture_id: number;

	@Column()
	event_id: number;

	@Column()
	cost: number;

	@Column()
	quantity: number;

	constructor(
		id: number,
		furniture_id: number,
		event_id: number,
		cost: number,
		quantity: number,
	) {
		this.id = id;
		this.furniture_id = furniture_id;
		this.event_id = event_id;
		this.cost = cost;
		this.quantity = quantity;
	}
}
