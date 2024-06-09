import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "INCLUDES" })
export class Includes {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    agenda_id: number

    @Column()
    topics_id: number

    constructor(id: number, agenda_id: number, topics_id: number) {
        this.id = id;
        this.agenda_id = agenda_id;
        this.topics_id = topics_id;
    }
}
