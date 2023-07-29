import { Router } from 'express';
import userController from '../controllers/user.controller';
import verifyToken  from '../middlewares/auth.middleware';

const userRouter = Router();

userRouter.get('',verifyToken, userController.getUsers.bind(userController))
    .get('/:id',verifyToken, userController.getUserById.bind(userController))
    .put('/:id', verifyToken, userController.updateUser.bind(userController))
    .post('',verifyToken, userController.createUser.bind(userController))
    .delete('', verifyToken, userController.deleteUser.bind(userController));

export default userRouter ;