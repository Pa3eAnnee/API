import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity({ name: "VOTE" })
export class Vote {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    user_id: number

    @Column()
    vote_id: number

    constructor(id: number, user_id: number, vote_id: number) {
        this.id = id;
        this.user_id = user_id;
        this.vote_id = vote_id;
    }
}
