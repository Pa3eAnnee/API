import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Furniture" })
export class Furniture {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	category_id: number;

	@Column()
	name: string;

	@Column()
	storage: string;

	constructor(id: number, category_id: number, name: string, storage: string) {
		this.id = id;
		this.category_id = category_id;
		this.name = name;
		this.storage = storage;
	}
}
