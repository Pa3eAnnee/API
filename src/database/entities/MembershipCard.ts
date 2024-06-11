import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "MEMBERSHIP_CARD" })
export class MembershipCard {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	transaction_id: number;

	@Column()
	status: string;

	@Column()
	type: string;

	@Column()
	date_received: Date;

	constructor(
		id: number,
		transaction_id: number,
		status: string,
		type: string,
		date_received: Date,
	) {
		this.id = id;
		this.transaction_id = transaction_id;
		this.status = status;
		this.type = type;
		this.date_received = date_received;
	}
}
