import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "User" })
export class User {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	role: string;

	@Column()
	first_name: string;

	@Column()
	last_name: string;

	@Column({ type: "date" })
	birthday: Date;

	@Column()
	sexe: string;

	@Column()
	phone: string;

	@Column()
	email: string;

	@Column()
	password: string;

	@Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
	date_created: Date;

	@Column({ type: "timestamp", nullable: true })
	last_login: Date;

	@Column({ nullable: true })
	account_status: string;

	@Column("simple-array")
	permissions: string[];

	constructor(
		id: number,
		role: string,
		first_name: string,
		last_name: string,
		birthday: Date,
		sexe: string,
		email: string,
		phone: string,
		password: string,
		date_created: Date,
		last_login: Date,
		account_status: string,
		permissions: string[]
	) {
		this.id = id;
		this.role = role;
		this.first_name = first_name;
		this.last_name = last_name;
		this.birthday = birthday;
		this.sexe = sexe;
		this.email = email;
		this.phone = phone;
		this.password = password;
		this.date_created = date_created;
		this.last_login = last_login;
		this.account_status = account_status;
		this.permissions = permissions;
	}
}
