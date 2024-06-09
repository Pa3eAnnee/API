import { DataSource } from "typeorm";
import { PaymentMethod } from "../../database/entities/PaymentMethod";
import {
    CreatePaymentMethodRequest,
    createPaymentMethodValidation, UpdatePaymentMethodRequest, updatePaymentMethodValidation
} from "../../handlers/validators/paymentmethod-validator";

export class PaymentMethodUsecase {
    constructor(private readonly db: DataSource) { }

    async getPaymentMethod(id: number): Promise<PaymentMethod | null> {
        const repo = this.db.getRepository(PaymentMethod);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;
        return entityFound;
    }

    async deletePaymentMethod(id: number): Promise<PaymentMethod | null> {
        const repo = this.db.getRepository(PaymentMethod);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }

    async createPaymentMethod(paymentMethodData: CreatePaymentMethodRequest): Promise<PaymentMethod> {
        // Validate paymentMethodData against the schema
        const { error } = createPaymentMethodValidation.validate(paymentMethodData);
        if (error) {
            throw new Error(`Invalid CreatePaymentMethodRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(PaymentMethod);
        const newPaymentMethod = repo.create(paymentMethodData);
        return await repo.save(newPaymentMethod);
    }

    async updatePaymentMethod(id: number, paymentMethodData: UpdatePaymentMethodRequest): Promise<PaymentMethod | null> {
        // Validate paymentMethodData against the schema
        const { error } = updatePaymentMethodValidation.validate({ ...paymentMethodData });
        if (error) {
            throw new Error(`Invalid UpdatePaymentMethodRequest data: ${error.message}`);
        }

        const repo = this.db.getRepository(PaymentMethod);
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        // Update the entity with the new data
        Object.assign(entityFound, paymentMethodData);
        return await repo.save(entityFound);
    }
}
