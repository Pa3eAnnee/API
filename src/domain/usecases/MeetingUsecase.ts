import { DataSource } from "typeorm";
import { Meeting } from "../../database/entities/Meeting";

export interface UpdateMeetingRequest {
    // Add your request fields here
}

export class MeetingUsecase {
    constructor(private readonly db: DataSource) { }

    async getMeeting(id: number): Promise<Meeting | null> {
        const repo = this.db.getRepository(Meeting);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteMeeting(id: number): Promise<Meeting | null> {
        const repo = this.db.getRepository(Meeting);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }
}