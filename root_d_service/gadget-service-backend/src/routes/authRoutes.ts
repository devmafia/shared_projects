// src/routes/authRoutes.ts
import { Router } from 'express';
import { register, login, logout } from '../controllers/authController';
import { authenticateToken } from '../middleware/authenticateToken';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', authMiddleware, logout);
// router.get('/validate-token', authenticateToken, (req, res) => {
//     res.json({ valid: true });
// });

export default router;
