import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';

export class RoleController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getRoles(request: Request, response: Response) {
        try {
            const role = await this.prisma.role.findMany();

            console.log('***************** OBTENER ROLES ***************');
            response.json(role).status(200);
        }  catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

    async getRoleById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            console.log(id);
            const user = await this.prisma.role.findFirst({
                where: {
                    id: parseInt(id, 10),
                }
            });
            console.log('***************** OBTENER ROL POR ID ***************');
            response.json(user).status(200).end();
        }  catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }

    }

    async createRole(request: Request, response: Response) {
        try {
            const { name } = request.body;
            console.log(name);
            const role = await this.prisma.role.create({
                data: {
                    name,
                },
            });

            console.log('***************** CREAR ROL ***************');
            response.json(role).status(201);
        } catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }
}

export default new RoleController();