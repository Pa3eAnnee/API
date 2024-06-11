import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "EXPANSE_CATEGORY" })
export class ExpanseCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
