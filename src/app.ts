import express from 'express';
import authRoutes from './routes/auth';
import productsRoutes from './routes/products';
import webhooksRoutes from './routes/webhooks';
import { errorHandler } from './middleware/errorHandler';
import { rateLimiter } from './middleware/rateLimiter';
import promClient from 'prom-client';

const app = express();
app.use(express.json());
app.use(rateLimiter);

app.use('/auth', authRoutes);
app.use('/products', productsRoutes);
app.use('/webhooks', webhooksRoutes);

const register = new promClient.Registry();
app.get('/metrics', async (req, res) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.use(errorHandler);
export default app;