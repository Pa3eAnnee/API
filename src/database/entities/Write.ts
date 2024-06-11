import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "WRITE" })
export class Write {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@Column()
	expanse_id: number;

	constructor(id: number, user_id: number, expanse_id: number) {
		this.id = id;
		this.user_id = user_id;
		this.expanse_id = expanse_id;
	}
}
