import { Router } from 'express';
import messageController from '../controllers/message.controller';

const messageRouter = Router();

messageRouter.get('', messageController.getMessages.bind(messageController))
	.get('/:id', messageController.getMessageById.bind(messageController))
    .post('', messageController.createMessage.bind(messageController))
    .put('/:id', messageController.updateMessage.bind(messageController))
    .delete('/:id', messageController.deleteMessage.bind(messageController));

export default messageRouter;