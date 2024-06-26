import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "RessourceCategory" })
export class RessourceCategory {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	constructor(id: number, name: string) {
		this.id = id;
		this.name = name;
	}
}
