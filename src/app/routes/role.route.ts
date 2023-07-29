import { Router } from 'express';
import roleController from '../controllers/role.controller';
import verifyToken  from '../middlewares/auth.middleware';

const roleRouter = Router();

roleRouter.get('', verifyToken, roleController.getRoles.bind(roleController))
    .get('/:id', verifyToken, roleController.getRoleById.bind(roleController))
    .post('', verifyToken, roleController.createRole.bind(roleController));

export default roleRouter;