import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "TRANSACTION" })
export class Transaction {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	user_id: number;

	@Column()
	purchase_id: number;

	@Column()
	method_id: number;

	@Column("decimal", { precision: 10, scale: 2 })
	amount: number;

	@Column()
	status: string;

	@Column()
	date: Date;

	constructor(
		id: number,
		user_id: number,
		purchase_id: number,
		method_id: number,
		amount: number,
		status: string,
		date: Date,
	) {
		this.id = id;
		this.user_id = user_id;
		this.purchase_id = purchase_id;
		this.method_id = method_id;
		this.amount = amount;
		this.status = status;
		this.date = date;
	}
}
