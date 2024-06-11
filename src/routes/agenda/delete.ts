import type { Express, Request, Response } from "express";
import { AppDataSource } from "../../database/database";
import { Agenda } from "../../database/entities/Agenda";

// Delete a agenda
export const deleteAgenda = (app: Express): void => {
	app.delete("/agendas/:id", async (req: Request, res: Response) => {
		const agendaId = Number.parseInt(req.params.id);

		if (isNaN(agendaId)) {
			res.status(400).send({ error: "Invalid agenda ID" });
			return;
		}

		const agendaRepo = AppDataSource.getRepository(Agenda);

		try {
			const agenda = await agendaRepo.findOneBy({ id: agendaId });
			if (!agenda) {
				res.status(404).send({ error: `Agenda with ID ${agendaId} not found` });
				return;
			}

			await agendaRepo.delete(agendaId);
			res
				.status(200)
				.send({ message: `Agenda with ID ${agendaId} deleted successfully` });
		} catch (error) {
			console.error(error);
			res.status(500).send({ error: "Internal error" });
		}
	});
};
