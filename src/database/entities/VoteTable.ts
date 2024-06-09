import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "VOTE_TABLE" })
export class VoteTable {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    voteoption_id: number

    @Column()
    topics_id: number

    @Column()
    date_start: Date

    @Column()
    date_end: Date

    @Column()
    status: string

    constructor(id: number, voteoption_id: number, topics_id: number, date_start: Date, date_end: Date, status: string) {
        this.id = id;
        this.voteoption_id = voteoption_id;
        this.topics_id = topics_id;
        this.date_start = date_start;
        this.date_end = date_end;
        this.status = status;
    }
}
