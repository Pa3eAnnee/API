import type { DataSource } from "typeorm";
import { Transaction } from "../../database/entities/Transaction";

export interface UpdateTransactionRequest {
	id: number;
	user_id?: number;
	purchase_id?: number;
	method_id?: number;
	amount?: number;
	status?: string;
	date?: Date;
}

export class TransactionUsecase {
	constructor(private readonly db: DataSource) {}

	async getTransaction(id: number): Promise<Transaction | null> {
		const repo = this.db.getRepository(Transaction);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteTransaction(id: number): Promise<Transaction | null> {
		const repo = this.db.getRepository(Transaction);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}
}
