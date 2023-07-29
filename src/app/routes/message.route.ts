import { Router } from 'express';
import verifyToken  from '../middlewares/auth.middleware';
import messageController from '../controllers/message.controller';

const messageRouter = Router();

messageRouter.get('', verifyToken, messageController.getMessages.bind(messageController))
	.get('/:id', verifyToken, messageController.getMessageById.bind(messageController))
    .post('', verifyToken, messageController.createMessage.bind(messageController))
    .put('/:id', verifyToken , messageController.updateMessage.bind(messageController))
    .delete('/:id', verifyToken, messageController.deleteMessage.bind(messageController));

export default messageRouter;