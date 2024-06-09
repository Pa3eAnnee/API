import { DataSource } from "typeorm";
import { Donation } from "../../database/entities/Donation";
import { CreateDonationRequest, UpdateDonationRequest, createDonationValidation, updateDonationValidation } from '../../handlers/validators/donation-validator';

export class DonationUsecase {
    constructor(private readonly db: DataSource) { }

    async getDonation(id: number): Promise<Donation | null> {
        const repo = this.db.getRepository(Donation);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteDonation(id: number): Promise<Donation | null> {
        const repo = this.db.getRepository(Donation);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createDonation(donationData: CreateDonationRequest): Promise<Donation> {
        // Validate donationData against the schema
        const { error } = createDonationValidation.validate(donationData);
        if (error) {
            throw new Error(`Invalid CreateDonationRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Donation);
        const newDonation = repo.create(donationData);
        return await repo.save(newDonation);
    }

    async updateDonation(id: number, donationData: UpdateDonationRequest): Promise<Donation | null> {
        // Validate donationData against the schema
        const { error } = updateDonationValidation.validate({ ...donationData });
        if (error) {
            throw new Error(`Invalid UpdateDonationRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Donation);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, donationData);
        return await repo.save(entityFound);
    }
}
