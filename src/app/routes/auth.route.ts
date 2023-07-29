import { Router } from 'express';
import authController from '../controllers/auth.controller';
import verifyToken  from '../middlewares/auth.middleware';

const authRouter: Router = Router();

authRouter.post('/sign-in', authController.signIn.bind(authController))
    .get('/profile', verifyToken, authController.getProfile.bind(authController))
    .post('/refresh-token', authController.refreshToken.bind(authController));

export default authRouter;