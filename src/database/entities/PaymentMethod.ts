import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "PAYMENT_METHOD" })
export class PaymentMethod {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    transaction_id: number

    @Column()
    method: string

    @Column("text")
    details: string

    constructor(
        id: number,
        transaction_id: number,
        method: string,
        details: string
    ) {
        this.id = id;
        this.transaction_id = transaction_id;
        this.method = method;
        this.details = details;
    }
}
