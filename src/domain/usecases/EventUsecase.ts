import { DataSource } from "typeorm";
import { Event } from "../../database/entities/Event";
import { CreateEventRequest, UpdateEventRequest, createEventValidation, updateEventValidation } from '../../handlers/validators/event-validator';

export class EventUsecase {
    constructor(private readonly db: DataSource) { }

    async getEvent(id: number): Promise<Event | null> {
        const repo = this.db.getRepository(Event);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteEvent(id: number): Promise<Event | null> {
        const repo = this.db.getRepository(Event);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createEvent(eventData: CreateEventRequest): Promise<Event> {
        // Validate eventData against the schema
        const { error } = createEventValidation.validate(eventData);
        if (error) {
            throw new Error(`Invalid CreateEventRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Event);
        const newEvent = repo.create(eventData);
        return await repo.save(newEvent);
    }

    async updateEvent(id: number, eventData: UpdateEventRequest): Promise<Event | null> {
        // Validate eventData against the schema
        const { error } = updateEventValidation.validate(eventData);
        if (error) {
            throw new Error(`Invalid UpdateEventRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Event);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, eventData);
        return await repo.save(entityFound);
    }
}
