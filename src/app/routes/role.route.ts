import { Router } from 'express';
import roleController from '../controllers/role.controller';

const roleRouter = Router();

roleRouter.get('', roleController.getRoles.bind(roleController))
    .get('/:id', roleController.getRoleById.bind(roleController))
    .post('', roleController.createRole.bind(roleController));

export default roleRouter;