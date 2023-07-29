import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import { IRouter } from '../interfaces/router.interface';

export class MessageController {
    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async getMessages(request: Request, response: Response) {
        try {
            const message = await this.prisma.message.findMany();

            console.log('***************** OBTENER MENSAJES ***************');
            response.json(message).status(200);
        }  catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

	async getMessageById(request: Request, response: Response) {
		try {
			const { id } = request.params;
			const message = await this.prisma.message.findUnique({
				where: { id: parseInt(id, 10) }
			});

			console.log('***************** OBTENER MENSAJE POR ID ***************');
			response.json(message).status(200);
		}  catch (err) {
			if (err instanceof Error) {
				response.json(err).status(404);
				console.log(err.message);
			}
		}
	}

	async createMessage(request: Request, response: Response) {
		try {
			const { content, userId } = request.body ;
			const message = await this.prisma.message.create({
				data: { content, userId }
			});
			console.log('***************** CREAR USUARIO ***************');
			response.json(message).status(200).end();
		} catch (err) {
			if (err instanceof Error) {
				response.json(err).status(404);
				console.log(err.message);
			}
		}
	}

    async deleteMessage(request: Request, response: Response) {
        try {
            const { id } = request.params;
            const message = await this.prisma.message.delete({
                where: { id: parseInt(id, 10) }
            });

            if (!message) {
                return response.status(401).json({ error: 'User does´t exist' });
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

    async updateMessage(request: Request, response: Response) {
        try {
            const id = parseInt(request.params.id, 10);
            const dataRequest = request.body;
            const message = await this.prisma.message.update({
                where: { id },
                data: dataRequest
            });

            console.log('***************** ACTUALIZAR MENSAJE ***************');
            response.json(message).status(200);
        }  catch (err) {
            if (err instanceof Error) {
                console.log(err.message);
                response.json(err).status(404);
            }
        }
    }

}

export default new MessageController();