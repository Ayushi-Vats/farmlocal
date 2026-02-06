import { Router } from 'express';
import { WebhooksController } from '../controllers/webhooksController';

const router = Router();
router.post('/callback', WebhooksController.handleCallback);
export default router;