import rateLimit from 'express-rate-limit';
import RedisStore from 'rate-limit-redis';
import redis from '../utils/redis';

export const rateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,

  store: new RedisStore({
    // TypeScript workaround for ioredis compatibility
    sendCommand: (...args: any[]) => (redis as any).call(...args),
  }) as any,
});
