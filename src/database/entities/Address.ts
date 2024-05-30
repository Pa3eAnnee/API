import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Address" })
export class Address {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    city: string

    @Column()
    zip: string

    @Column()
    street: string

    @Column()
    num: number

    @Column()
    country: string

    @Column()
    state: string

    @Column()
    timezone: string

    constructor(
        id: number,
        city: string,
        zip: string,
        street: string,
        num: number,
        country: string,
        state: string,
        timezone: string
    ) {
        this.id = id;
        this.city = city;
        this.zip = zip;
        this.street = street;
        this.num = num;
        this.country = country;
        this.state = state;
        this.timezone = timezone;
    }
}
