import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Ressource" })
export class Ressource {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    category_id: number;

    @Column()
    name: string;

    @Column()
    storage: string;

    @Column()
    type: string;

    @Column()
    details: string;

    @Column()
    cost: number;

    constructor(id: number, category_id: number, name: string, storage: string, type: string, details: string, cost: number) {
        this.id = id;
        this.category_id = category_id;
        this.name = name;
        this.storage = storage;
        this.type = type;
        this.details = details;
        this.cost = cost;
    }
}
