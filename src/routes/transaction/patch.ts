import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Transaction } from "../../database/entities/Transaction";
import { updateTransactionValidation } from "../../handlers/validators/transaction-validator";

export const updateTransaction = (app: Express): void => {
	app.patch("/transactions/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateTransactionValidation.validate({
			...req.body,
			id: Number.parseInt(req.params.id),
		});

		if (validation.error) {
			res.status(400).send({
				error: validation.error.details
					.map((detail) => detail.message)
					.join(", "),
			});
			return;
		}

		const transactionRequest = validation.value;

		const transactionRepo = AppDataSource.getRepository(Transaction);

		try {
			const transaction = await transactionRepo.findOneBy({
				id: transactionRequest.id,
			});
			if (!transaction) {
				res.status(404).send({
					error: `Transaction with ID ${transactionRequest.id} not found`,
				});
				return;
			}

			await transactionRepo.update(transactionRequest.id, transactionRequest);
			const updatedTransaction = await transactionRepo.findOneBy({
				id: transactionRequest.id,
			});
			res.status(200).send(updatedTransaction);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
