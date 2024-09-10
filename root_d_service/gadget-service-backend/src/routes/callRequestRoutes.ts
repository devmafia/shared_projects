// src/routes/callRequestRoutes.ts
import { Router } from 'express';
import { createCallRequest, updateCallRequest, getCallRequests, deleteCallRequest } from '../controllers/callRequestController';
import { protect } from '../middleware/authMiddleware';
import { validateFields } from '../middleware/validationMiddleware';

const router = Router();

router.post('/create', validateFields(['name', 'phone']), createCallRequest);
router.get('/', protect, getCallRequests);
router.delete('/:id', protect, deleteCallRequest);
router.put('/update/:id', protect, updateCallRequest);

export default router;
