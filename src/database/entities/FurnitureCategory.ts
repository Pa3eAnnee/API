import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "FurnitureCategory" })
export class FurnitureCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
