// src/routes/messageRoutes.ts
import { Router } from 'express';
import { createMessage, getMessages, deleteMessage , updateMessage} from '../controllers/messageController';
import { protect } from '../middleware/authMiddleware';
import { validateFields } from '../middleware/validationMiddleware';

const router = Router();

router.post('/create', validateFields(['name', 'email', 'message']), createMessage);
router.get('/', protect, getMessages);
router.delete('/:id', protect, deleteMessage);
router.put('/update/:id', protect ,updateMessage);

export default router;
