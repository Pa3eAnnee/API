import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Transaction } from "../../database/entities/Transaction";

// Delete a transaction
export const deleteTransaction = (app: Express): void => {
	app.delete("/transactions/:id", async (req: Request, res: Response) => {
		const transactionId = Number.parseInt(req.params.id);

		if (isNaN(transactionId)) {
			res.status(400).send({ error: "Invalid transaction ID" });
			return;
		}

		const transactionRepo = AppDataSource.getRepository(Transaction);

		try {
			const transaction = await transactionRepo.findOneBy({
				id: transactionId,
			});
			if (!transaction) {
				res
					.status(404)
					.send({ error: `Transaction with ID ${transactionId} not found` });
				return;
			}

			await transactionRepo.delete(transactionId);
			res
				.status(200)
				.send({
					message: `Transaction with ID ${transactionId} deleted successfully`,
				});
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
