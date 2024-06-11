import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "DEBATE" })
export class Debate {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	ga_id: number;

	@Column()
	agenda_id: number;

	constructor(id: number, ga_id: number, agenda_id: number) {
		this.id = id;
		this.ga_id = ga_id;
		this.agenda_id = agenda_id;
	}
}
