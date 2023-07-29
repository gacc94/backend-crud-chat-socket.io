import { Router } from 'express';
import userController from '../controllers/user.controller';

const userRouter = Router();

userRouter.get('', userController.getUsers.bind(userController))
    .get('/:id', userController.getUserById.bind(userController))
    .post('', userController.createUser.bind(userController));

export default userRouter ;