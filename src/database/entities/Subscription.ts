import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "SUBSCRIPTION" })
export class Subscription {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    transaction_id: number

    @Column()
    date_start: Date

    @Column()
    date_end: Date

    constructor(
        id: number,
        transaction_id: number,
        date_start: Date,
        date_end: Date
    ) {
        this.id = id;
        this.transaction_id = transaction_id;
        this.date_start = date_start;
        this.date_end = date_end;
    }
}
