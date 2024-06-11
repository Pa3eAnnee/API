import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { VoteTable } from "../../database/entities/VoteTable";

// Delete a voteTable
export const deleteVoteTable = (app: Express): void => {
	app.delete("/votetables/:id", async (req: Request, res: Response) => {
		const voteTableId = Number.parseInt(req.params.id);

		if (isNaN(voteTableId)) {
			res.status(400).send({ error: "Invalid voteTable ID" });
			return;
		}

		const voteTableRepo = AppDataSource.getRepository(VoteTable);

		try {
			const voteTable = await voteTableRepo.findOneBy({ id: voteTableId });
			if (!voteTable) {
				res
					.status(404)
					.send({ error: `VoteTable with ID ${voteTableId} not found` });
				return;
			}

			await voteTableRepo.delete(voteTableId);
			res
				.status(200)
				.send({
					message: `VoteTable with ID ${voteTableId} deleted successfully`,
				});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
