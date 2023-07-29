import { PrismaClient } from '@prisma/client';
import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { comparePasswords } from '../utils/helpers/auth.helper';
import {
    generateAccessToken,
    generateRefreshToken,
    verifyAccessToken,
    verifyRefreshToken,
} from '../utils/helpers/token.helper';

export class AuthController {

    private prisma: PrismaClient;

    constructor() {
        this.prisma = new PrismaClient();
    }

    async signIn(request: Request, response: Response) {
        try {
            const { email, password } = request.body;
            const user = await this.prisma.user.findUnique({ where: { email } });
            if (!user) {
                response.json({ message: 'usuario no existe' }).status(404);
                return;
            }

            const comparePassword = await comparePasswords(password, user.password);
            if (!comparePassword) {
                response.json({ message: 'invalid data' }).status(401);
                return;
            }

            const userDTO = {
                id: user.id,
                email: user.email,
                img: user.img,
                firstName: user.firstName,
                lastName: user.lastName,
                active: user.active
            };

            const responseData = {
                accessToken: generateAccessToken(userDTO),
                refreshToken: generateRefreshToken(userDTO),
            };

            console.log('***************** LOGIN USER ***************');
            response.json(responseData).status(200);
        } catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

    async getProfile(request: Request, response: Response) {
        try {
            const { authorization } = request.headers;
            if (!authorization) {
                return response.status(401).json({ error: 'Bearer token no proporcionado' });
            }

            const token = authorization.split(' ')[1];

            const decoded = verifyAccessToken(token);
            if (!decoded) {
                return response.status(401).json({ error: 'Token invalid' });
            }

            const profile = await this.prisma.user.findUnique({
                where: { id: decoded.id }
            });

            if (!profile) {
                return response.status(404).json({ error: 'Usuario no encontrado' });
            }

            console.log('***************** OBTENER PERFIL ***************');
            response.json(profile).status(200);
        } catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

    async refreshToken(request: Request, response: Response) {
        try {
            const { token } = request.body;
            if (!token) {
                return response.status(401).json({ error: 'Refresh token no proporcionado' });
            }

            const decoded = verifyRefreshToken(token);
            if (!decoded) {
                return response.status(401).json({ error: 'invalid Token' });
            }

            const userDTO = {
                id: decoded.id,
                email: decoded.email,
                img: decoded.img,
                firstName: decoded.firstName,
                lastName: decoded.lastName
            };

            const responseData = {
                accessToken: generateAccessToken(userDTO),
                refreshToken: generateRefreshToken(userDTO),
            };

            console.log('***************** REFRESH TOKEN ***************');
            response.json(responseData).status(200);

        } catch (err) {
            if (err instanceof Error) {
                response.json(err).status(404);
                console.log(err.message);
            }
        }
    }

}

export default new AuthController();
