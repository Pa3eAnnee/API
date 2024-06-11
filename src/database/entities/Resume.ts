import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "RESUME" })
export class Resume {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	ga_id: number;

	@Column("text")
	minutes: string;

	constructor(id: number, ga_id: number, minutes: string) {
		this.id = id;
		this.ga_id = ga_id;
		this.minutes = minutes;
	}
}
