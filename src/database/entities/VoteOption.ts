import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "VOTE_OPTION" })
export class VoteOption {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column("text")
	description: string;

	constructor(id: number, name: string, description: string) {
		this.id = id;
		this.name = name;
		this.description = description;
	}
}
