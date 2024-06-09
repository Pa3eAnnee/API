import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "ATTEND" })
export class Attend {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    ga_id: number

    constructor(id: number, user_id: number, ga_id: number) {
        this.id = id;
        this.user_id = user_id;
        this.ga_id = ga_id;
    }
}
