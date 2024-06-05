import { DataSource } from "typeorm";
import { Meeting } from "../../database/entities/Meeting";
import { CreateMeetingRequest, UpdateMeetingRequest, createMeetingValidation, updateMeetingValidation } from '../../handlers/validators/meeting-validator';

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

    async createMeeting(meetingData: CreateMeetingRequest): Promise<Meeting> {
        // Validate meetingData against the schema
        const { error } = createMeetingValidation.validate(meetingData);
        if (error) {
            throw new Error(`Invalid CreateMeetingRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Meeting);
        const newMeeting = repo.create(meetingData);
        return await repo.save(newMeeting);
    }

    async updateMeeting(id: number, meetingData: UpdateMeetingRequest): Promise<Meeting | null> {
        // Validate meetingData against the schema
        const { error } = updateMeetingValidation.validate(meetingData);
        if (error) {
            throw new Error(`Invalid UpdateMeetingRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Meeting);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, meetingData);
        return await repo.save(entityFound);
    }
}
