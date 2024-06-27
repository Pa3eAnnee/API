import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "Use" })
export class Use {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    activity_id: number;

    @Column()
    ressource_id: number;

    constructor(id: number, activity_id: number, ressource_id: number) {
        this.id = id;
        this.activity_id = activity_id;
        this.ressource_id = ressource_id;
    }
}
