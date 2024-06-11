import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Meeting" })
export class Meeting {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	subject: string;

	@Column({ type: "date" })
	date: Date;

	@Column()
	status: string;

	@Column({ type: "time" })
	start_time: string;

	@Column({ type: "time" })
	end_time: string;

	@Column()
	location_id: number;

	@Column()
	organizer_id: number;

	constructor(
		id: number,
		subject: string,
		date: Date,
		status: string,
		start_time: string,
		end_time: string,
		location_id: number,
		organizer_id: number,
	) {
		this.id = id;
		this.subject = subject;
		this.date = date;
		this.status = status;
		this.start_time = start_time;
		this.end_time = end_time;
		this.location_id = location_id;
		this.organizer_id = organizer_id;
	}
}
