import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Event" })
export class Event {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    title: string

    @Column()
    description: string

    @Column()
    image: string

    @Column()
    location: string

    @Column()
    date_start: Date

    @Column()
    date_end: Date

    @Column()
    cost: number

    @Column()
    status: string

    constructor(
        id: number,
        title: string,
        description: string,
        image: string,
        location: string,
        date_start: Date,
        date_end: Date,
        cost: number,
        status: string
    ) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.image = image;
        this.location = location;
        this.date_start = date_start;
        this.date_end = date_end;
        this.cost = cost;
        this.status = status;
    }
}
