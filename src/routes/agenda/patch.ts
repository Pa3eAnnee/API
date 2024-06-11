import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Agenda } from "../../database/entities/Agenda";
import { updateAgendaValidation } from "../../handlers/validators/agenda-validator";

export const updateAgenda = (app: Express): void => {
	app.patch("/agendas/:id", async (req: Request, res: Response) => {
		// Validate request body and params
		const validation = updateAgendaValidation.validate({
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

		const agendaRequest = validation.value;

		const agendaRepo = AppDataSource.getRepository(Agenda);

		try {
			const agenda = await agendaRepo.findOneBy({ id: agendaRequest.id });
			if (!agenda) {
				res
					.status(404)
					.send({ error: `Agenda with ID ${agendaRequest.id} not found` });
				return;
			}

			await agendaRepo.update(agendaRequest.id, agendaRequest);
			const updatedAgenda = await agendaRepo.findOneBy({
				id: agendaRequest.id,
			});
			res.status(200).send(updatedAgenda);
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
