import type { DataSource } from "typeorm";
import { Ressource } from "../../database/entities/Ressource";

export class RessourceUsecase {
	constructor(private readonly db: DataSource) {}

	async getRessource(id: number): Promise<Ressource | null> {
		const repo = this.db.getRepository(Ressource);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;
		return entityFound;
	}

	async deleteRessource(id: number): Promise<Ressource | null> {
		const repo = this.db.getRepository(Ressource);
		const entityFound = await repo.findOneBy({ id });
		if (entityFound === null) return null;

		const entityDelete = await repo.remove(entityFound);
		return entityDelete;
	}
}
