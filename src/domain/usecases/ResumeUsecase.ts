import { DataSource } from "typeorm";
import { Resume } from "../../database/entities/Resume";
import { CreateResumeRequest, UpdateResumeRequest, createResumeValidation, updateResumeValidation } from '../../handlers/validators/resume-validator';

export class ResumeUsecase {
    constructor(private readonly db: DataSource) { }

    async getResume(id: number): Promise<Resume | null> {
        const repo = this.db.getRepository(Resume);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteResume(id: number): Promise<Resume | null> {
        const repo = this.db.getRepository(Resume);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createResume(resumeData: CreateResumeRequest): Promise<Resume> {
        // Validate resumeData against the schema
        const { error } = createResumeValidation.validate(resumeData);
        if (error) {
            throw new Error(`Invalid CreateResumeRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Resume);
        const newResume = repo.create(resumeData);
        return await repo.save(newResume);
    }

    async updateResume(id: number, resumeData: UpdateResumeRequest): Promise<Resume | null> {
        // Validate resumeData against the schema
        const { error } = updateResumeValidation.validate({ ...resumeData });
        if (error) {
            throw new Error(`Invalid UpdateResumeRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Resume);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, resumeData);
        return await repo.save(entityFound);
    }
}
