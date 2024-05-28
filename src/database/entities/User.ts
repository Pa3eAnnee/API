import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "User" })
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    role: string

    @Column()
    first_name: string

    @Column()
    last_name: string

    @Column({ type: "date" })
    birthday: Date

    @Column()
    sexe: string

    @Column()
    email: string

    @Column()
    phone: string

    @Column()
    password: string

    constructor(
        id: number,
        role: string,
        first_name: string,
        last_name: string,
        birthday: Date,
        sexe: string,
        email: string,
        phone: string,
        password: string
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
    }
}
