import * as fs from "node:fs";
import * as path from "node:path";

const entityName = process.argv[2];

if (!entityName) {
	console.error("Please provide an entity name.");
	process.exit(1);
}

const entityCapitalized =
	entityName.charAt(0).toUpperCase() + entityName.slice(1);
const entityLowercase = entityName.toLowerCase();

const routeDir = path.join(__dirname, "src", "routes", entityLowercase);
const validatorDir = path.join(__dirname, "src", "handlers", "validators");
const useCaseDir = path.join(__dirname, "src", "domain");

// Ensure directories exist
fs.mkdirSync(routeDir, { recursive: true });
fs.mkdirSync(validatorDir, { recursive: true });
fs.mkdirSync(useCaseDir, { recursive: true });

const routeTemplates = {
	"delete.ts": `
import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { ${entityCapitalized} } from '../../database/entities/${entityCapitalized}';

// Delete a ${entityName}
export const delete${entityCapitalized} = (app: Express): void => {
    app.delete('/${entityLowercase}s/:id', async (req: Request, res: Response) => {
        const ${entityName}Id = parseInt(req.params.id);

        if (isNaN(${entityName}Id)) {
            res.status(400).send({ error: 'Invalid ${entityName} ID' });
            return;
        }

        const ${entityName}Repo = AppDataSource.getRepository(${entityCapitalized});

        try {
            const ${entityName} = await ${entityName}Repo.findOneBy({ id: ${entityName}Id });
            if (!${entityName}) {
                res.status(404).send({ error: \`${entityCapitalized} with ID \${${entityName}Id} not found\` });
                return;
            }

            await ${entityName}Repo.delete(${entityName}Id);
            res.status(200).send({ message: \`${entityCapitalized} with ID \${${entityName}Id} deleted successfully\` });
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    })
}
    `,
	"get.ts": `
import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { ${entityCapitalized} } from '../../database/entities/${entityCapitalized}';

export const get${entityCapitalized}s = (app: Express): void => {
    app.get('/${entityLowercase}s', async (req: Request, res: Response) => {
        const ${entityName}Repo = AppDataSource.getRepository(${entityCapitalized});
        const ${entityName}s = await ${entityName}Repo.find();
        res.status(200).send(${entityName}s);
    });

    app.get('/${entityLowercase}s/:id', async (req: Request, res: Response) => {
        const ${entityName}Id = parseInt(req.params.id);
        if (!${entityName}Id || isNaN(Number(${entityName}Id))) {
            res.status(400).send({ error: 'Invalid ${entityName} ID' });
            return;
        }

        const ${entityName}Repo = AppDataSource.getRepository(${entityCapitalized});

        try {
            const ${entityLowercase} = await ${entityName}Repo.findOneBy({ id: ${entityName}Id });
            if (!${entityLowercase}) {
                res.status(404).send({ error: \`${entityCapitalized} with ID \${${entityName}Id} not found\` });
                return;
            }
            res.status(200).send(${entityLowercase});
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}
    `,
	"index.ts": `
export * from './post';
export * from './get';
export * from './patch';
export * from './delete';
    `,
	"patch.ts": `
import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { ${entityCapitalized} } from '../../database/entities/${entityCapitalized}';
import { update${entityCapitalized}Validation } from '../../handlers/validators/${entityLowercase}-validator';

export const update${entityCapitalized} = (app: Express): void => {
    app.patch('/${entityLowercase}s/:id', async (req: Request, res: Response) => {
        // Validate request body and params
        const validation = update${entityCapitalized}Validation.validate({ ...req.body, id: parseInt(req.params.id) });

        if (validation.error) {
            res.status(400).send({
                error: validation.error.details.map((detail) => detail.message).join(', ')
            });
            return;
        }

        const ${entityName}Request = validation.value;

        const ${entityName}Repo = AppDataSource.getRepository(${entityCapitalized});

        try {
            const ${entityName} = await ${entityName}Repo.findOneBy({ id: ${entityName}Request.id });
            if (!${entityName}) {
                res.status(404).send({ error: \`${entityCapitalized} with ID \${${entityName}Request.id} not found\` });
                return;
            }

            await ${entityName}Repo.update(${entityName}Request.id, ${entityName}Request);
            const updated${entityCapitalized} = await ${entityName}Repo.findOneBy({ id: ${entityName}Request.id });
            res.status(200).send(updated${entityCapitalized});
        } catch (error) {
            console.error(error);
            res.status(500).send({ error: 'Internal error' });
        }
    });
}
    `,
	"post.ts": `
import { Express, Request, Response } from 'express';
import { AppDataSource } from '../../database/database';
import { ${entityCapitalized} } from '../../database/entities/${entityCapitalized}';
import { create${entityCapitalized}Validation } from '../../handlers/validators/${entityLowercase}-validator';

export const create${entityCapitalized} = (app: Express) => {
    app.post('/${entityLowercase}s', async (req: Request, res: Response) => {
        const validation = create${entityCapitalized}Validation.validate(req.body);
        if (validation.error) {
            res.status(400).send(validation.error.details);
            return;
        }

        const ${entityName}Request = validation.value;
        const ${entityName}Repo = AppDataSource.getRepository(${entityCapitalized});

        try {
            const ${entityName}Created = await ${entityName}Repo.save(${entityName}Request);
            res.status(201).send(${entityName}Created);
        } catch (error) {
            res.status(500).send({ error: 'Internal error' });
        }
    });
}
    `,
};

const validatorTemplate = `
import * as Joi from 'joi';

export const create${entityCapitalized}Validation = Joi.object({
    // Add your validation schema here
});

export const update${entityCapitalized}Validation = Joi.object({
    id: Joi.number().required(),
    // Add your validation schema here
});
`;

const useCaseTemplate = `
import { DataSource } from "typeorm";
import { ${entityCapitalized} } from "../database/entities/${entityCapitalized}";

export interface Update${entityCapitalized}Request {
    // Add your request fields here
}

export class ${entityCapitalized}Usecase {
    constructor(private readonly db: DataSource) { }

    async get${entityCapitalized}(id: number): Promise<${entityCapitalized} | null > {
        const repo = this.db.getRepository(${entityCapitalized});
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null ) return null;
        return entityFound;
    }

    async delete${entityCapitalized}(id: number): Promise<${entityCapitalized} | null> {
        const repo = this.db.getRepository(${entityCapitalized});
        const entityFound = await repo.findOneBy({ id });
        if (entityFound === null) return null;

        const entityDelete = await repo.remove(entityFound);
        return entityDelete;
    }
}
`;

// Write the route files
// biome-ignore lint/complexity/noForEach: <explanation>
Object.entries(routeTemplates).forEach(([fileName, content]) => {
	const filePath = path.join(routeDir, fileName);
	fs.writeFileSync(filePath, content.trim());
});

// Write the validator file
const validatorFilePath = path.join(
	validatorDir,
	`${entityLowercase}-validator.ts`,
);
fs.writeFileSync(validatorFilePath, validatorTemplate.trim());

// Write the use case file
const useCaseFilePath = path.join(useCaseDir, `${entityCapitalized}Usecase.ts`);
fs.writeFileSync(useCaseFilePath, useCaseTemplate.trim());

console.log(`Generated files for ${entityName}`);
