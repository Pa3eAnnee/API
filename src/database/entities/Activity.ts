import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Activity" })
export class Activity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	title: string;

	@Column()
	description: string;

	@Column()
	image: string;

	@Column()
	date_start: Date;

	@Column()
	date_end: Date;

	@Column()
	status: string;

	@Column()
	type: string;

	@Column()
	organizer_id: number;

	@Column()
	location_id: number;

	constructor(
		id: number,
		title: string,
		description: string,
		image: string,
		date_start: Date,
		date_end: Date,
		status: string,
		type: string,
		organizer_id: number,
		location_id: number,
	) {
		this.id = id;
		this.title = title;
		this.description = description;
		this.image = image;
		this.date_start = date_start;
		this.date_end = date_end;
		this.status = status;
		this.type = type;
		this.organizer_id = organizer_id;
		this.location_id = location_id;
	}
}
