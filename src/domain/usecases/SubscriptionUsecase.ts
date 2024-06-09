import { DataSource } from "typeorm";
import { Subscription } from "../../database/entities/Subscription";
import {
    CreateSubscriptionRequest,
    createSubscriptionValidation,
    UpdateSubscriptionRequest, updateSubscriptionValidation
} from "../../handlers/validators/subscription-validator";

export class SubscriptionUsecase {
    constructor(private readonly db: DataSource) { }

    async getSubscription(id: number): Promise<Subscription | null> {
        const repo = this.db.getRepository(Subscription);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deleteSubscription(id: number): Promise<Subscription | null> {
        const repo = this.db.getRepository(Subscription);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createSubscription(subscriptionData: CreateSubscriptionRequest): Promise<Subscription> {
        // Validate subscriptionData against the schema
        const { error } = createSubscriptionValidation.validate(subscriptionData);
        if (error) {
            throw new Error(`Invalid CreateSubscriptionRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Subscription);
        const newSubscription = repo.create(subscriptionData);
        return await repo.save(newSubscription);
    }

    async updateSubscription(id: number, subscriptionData: UpdateSubscriptionRequest): Promise<Subscription | null> {
        // Validate subscriptionData against the schema
        const { error } = updateSubscriptionValidation.validate({...subscriptionData });
        if (error) {
            throw new Error(`Invalid UpdateSubscriptionRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(Subscription);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, subscriptionData);
        return await repo.save(entityFound);
    }
}
