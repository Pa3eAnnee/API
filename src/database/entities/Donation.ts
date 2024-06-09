import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "DONATION" })
export class Donation {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    transaction_id: number

    @Column()
    type: string

    @Column()
    amount: number

    @Column()
    date: Date

    constructor(
        id: number,
        transaction_id: number,
        type: string,
        amount: number,
        date: Date
    ) {
        this.id = id;
        this.transaction_id = transaction_id;
        this.type = type;
        this.amount = amount;
        this.date = date;
    }
}
