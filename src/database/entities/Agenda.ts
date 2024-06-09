import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "AGENDA" })
export class Agenda {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    ga_id: number

    constructor(id: number, ga_id: number) {
        this.id = id;
        this.ga_id = ga_id;
    }
}
