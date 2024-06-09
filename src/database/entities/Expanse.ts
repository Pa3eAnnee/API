import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "EXPANSE" })
export class Expanse {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    category_id: number

    @Column()
    approved_by: number

    @Column()
    date: Date

    @Column("text")
    description: string

    @Column("decimal", { precision: 10, scale: 2 })
    amount: number

    @Column()
    recipient: string

    @Column()
    status: string

    constructor(
        id: number,
        category_id: number,
        approved_by: number,
        date: Date,
        description: string,
        amount: number,
        recipient: string,
        status: string
    ) {
        this.id = id;
        this.category_id = category_id;
        this.approved_by = approved_by;
        this.date = date;
        this.description = description;
        this.amount = amount;
        this.recipient = recipient;
        this.status = status;
    }
}
