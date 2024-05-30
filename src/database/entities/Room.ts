import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Room" })
export class Room {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string

    @Column()
    capacity: number

    @Column()
    image: string

    @Column()
    building_id: number

    @Column()
    equipment: string

    constructor(
        id: number,
        name: string,
        capacity: number,
        image: string,
        building_id: number,
        equipment: string
    ) {
        this.id = id;
        this.name = name;
        this.capacity = capacity;
        this.image = image;
        this.building_id = building_id;
        this.equipment = equipment;
    }
}
