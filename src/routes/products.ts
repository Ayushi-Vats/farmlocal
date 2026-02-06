import { Router } from 'express';
import { ProductsController } from '../controllers/productsController';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
router.get('/', authMiddleware, ProductsController.getProducts);
export default router;