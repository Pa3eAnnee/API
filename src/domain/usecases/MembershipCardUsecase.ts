import { DataSource } from "typeorm";
import { MembershipCard } from "../../database/entities/MembershipCard";
import {
    CreateMembershipCardRequest,
    createMembershipCardValidation, UpdateMembershipCardRequest, updateMembershipCardValidation
} from "../../handlers/validators/membershipcard-validator";

export class MembershipCardUsecase {
    constructor(private readonly db: DataSource) { }

    async getMembershipCard(id: number): Promise<MembershipCard | null> {
        const repo = this.db.getRepository(MembershipCard);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteMembershipCard(id: number): Promise<MembershipCard | null> {
        const repo = this.db.getRepository(MembershipCard);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createMembershipCard(membershipCardData: CreateMembershipCardRequest): Promise<MembershipCard> {
        // Validate membershipCardData against the schema
        const { error } = createMembershipCardValidation.validate(membershipCardData);
        if (error) {
            throw new Error(`Invalid CreateMembershipCardRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(MembershipCard);
        const newMembershipCard = repo.create(membershipCardData);
        return await repo.save(newMembershipCard);
    }

    async updateMembershipCard(id: number, membershipCardData: UpdateMembershipCardRequest): Promise<MembershipCard | null> {
        // Validate membershipCardData against the schema
        const { error } = updateMembershipCardValidation.validate({ ...membershipCardData });
        if (error) {
            throw new Error(`Invalid UpdateMembershipCardRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(MembershipCard);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, membershipCardData);
        return await repo.save(entityFound);
    }
}
