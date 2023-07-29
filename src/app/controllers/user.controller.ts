import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../utils/helpers/auth.helper';

export class UserController {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getUsers(request: Request, response: Response) {
        try {
            const users = await this.prisma.user.findMany();
            console.log('***************** OBTENER USUARIOS ***************');
            response.json(users).status(200);
        }  catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

    async getUserById(request: Request, response: Response) {
        try {
            const { id } = request.params;
            console.log(id);
            const user = await this.prisma.user.findFirst({
                where: { id: parseInt(id, 10), }
            });
            console.log('***************** OBTENER USUARIO POR ID ***************');
            response.json(user).status(200).end();
        }  catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

    async createUser(request: Request, response: Response) {
        try {
            const { firstName, email, lastName, roleId, img , password } = request.body ;
            const hashedPassword = await hashPassword(password);
            const user = await this.prisma.user.create({
                data: {
                    firstName, email, lastName, roleId, img,
                    password: hashedPassword,
                }
            });
            console.log('***************** CREAR USUARIO ***************');
            response.json(user).status(200).end();
        } catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

    async updateUser(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const dataRequest = request.body ;
            const user = await this.prisma.user.update({
                where: { id: parseInt(id, 10) },
                data: dataRequest
            });
            console.log('***************** ACTUALIZAR USUARIO ***************');
            response.json(user).status(200).end();
        } catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

    async deleteUser(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const user = await this.prisma.user.delete({
                where: { id: parseInt(id, 10) }
            });

            if (!user) {
                response.status(401).json({ error: 'User does´t exist' });
                return;
            }

            console.log('***************** ELIMINAR MENSAJE ***************');
            response.json({ message: `Usuario con id ${id} fue eliminado` }).status(200);
        }  catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                response.json(err).status(404);
            }
        }
    }
}

export default new UserController();