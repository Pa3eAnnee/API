import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "Participate" })
export class Participate {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    user_id: number;

    @Column()
    activity_id: number;

    @Column()
    role: string;

    @Column()
    present: boolean;

    constructor(id: number, user_id: number, activity_id: number, role: string, present: boolean) {
        this.id = id;
        this.user_id = user_id;
        this.activity_id = activity_id;
        this.role = role;
        this.present = present;
    }
}
