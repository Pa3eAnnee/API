import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "GENERAL_ASSEMBLY" })
export class GeneralAssembly {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    date: Date

    @Column()
    location: string

    constructor(id: number, date: Date, location: string) {
        this.id = id;
        this.date = date;
        this.location = location;
    }
}
