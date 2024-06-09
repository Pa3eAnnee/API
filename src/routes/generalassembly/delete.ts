import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { GeneralAssembly } from '../../database/entities/GeneralAssembly';

// Delete a generalAssembly
export const deleteGeneralAssembly = (app: Express): void => {
    app.delete('/generalassemblies/:id', async (req: Request, res: Response) => {
        const generalAssemblyId = parseInt(req.params.id);

        if (isNaN(generalAssemblyId)) {
            res.status(400).send({ error: 'Invalid generalAssembly ID' });
            return;
        }

        const generalAssemblyRepo = AppDataSource.getRepository(GeneralAssembly);

        try {
            const generalAssembly = await generalAssemblyRepo.findOneBy({ id: generalAssemblyId });
            if (!generalAssembly) {
                res.status(404).send({ error: `GeneralAssembly with ID ${generalAssemblyId} not found` });
                return;
            }

            await generalAssemblyRepo.delete(generalAssemblyId);
            res.status(200).send({ message: `GeneralAssembly with ID ${generalAssemblyId} deleted successfully` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}