import { Router } from 'express';
import { AuthController } from '../controllers/authController';

const router = Router();
router.post('/token', AuthController.getToken);
export default router;