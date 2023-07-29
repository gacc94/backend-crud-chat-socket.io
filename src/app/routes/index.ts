import { IRouter } from '../interfaces/router.interface';
import roleRouter from './role.route';
import userRouter from './user.route';
import authRouter from './auth.route';
import messageRouter from './message.route';

export default [
    {
        name: 'roles',
        router: roleRouter
    },
    {
        name: 'users',
        router: userRouter
    },
    {
        name: 'auth',
        router: authRouter
    },
    {
        name: 'message',
        router: messageRouter
    }
] as Array<IRouter>;