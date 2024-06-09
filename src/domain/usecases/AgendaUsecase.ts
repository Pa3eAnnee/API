import { DataSource } from "typeorm";
import { Agenda } from "../../database/entities/Agenda";
import {
    CreateAgendaRequest,
    createAgendaValidation,
    UpdateAgendaRequest, updateAgendaValidation
} from "../../handlers/validators/agenda-validator";

export class AgendaUsecase {
    constructor(private readonly db: DataSource) { }

    async getAgenda(id: number): Promise<Agenda | null> {
        const repo = this.db.getRepository(Agenda);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteAgenda(id: number): Promise<Agenda | null> {
        const repo = this.db.getRepository(Agenda);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createAgenda(agendaData: CreateAgendaRequest): Promise<Agenda> {
        // Validate agendaData against the schema
        const { error } = createAgendaValidation.validate(agendaData);
        if (error) {
            throw new Error(`Invalid CreateAgendaRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Agenda);
        const newAgenda = repo.create(agendaData);
        return await repo.save(newAgenda);
    }

    async updateAgenda(id: number, agendaData: UpdateAgendaRequest): Promise<Agenda | null> {
        // Validate agendaData against the schema
        const { error } = updateAgendaValidation.validate({ ...agendaData });
        if (error) {
            throw new Error(`Invalid UpdateAgendaRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Agenda);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, agendaData);
        return await repo.save(entityFound);
    }
}
