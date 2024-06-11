import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Participate" })
export class Participate {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@Column()
	meeting_id: number;

	constructor(id: number, user_id: number, meeting_id: number) {
		this.id = id;
		this.user_id = user_id;
		this.meeting_id = meeting_id;
	}
}
