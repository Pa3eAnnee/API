import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "TOPICS" })
export class Topics {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	agenda_id: number;

	@Column()
	subject: string;

	@Column("text")
	description: string;

	@Column()
	priority: number;

	constructor(
		id: number,
		agenda_id: number,
		subject: string,
		description: string,
		priority: number,
	) {
		this.id = id;
		this.agenda_id = agenda_id;
		this.subject = subject;
		this.description = description;
		this.priority = priority;
	}
}
