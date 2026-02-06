import { Request, Response } from 'express';
import redis from '../utils/redis';

export const WebhooksController = {
  async handleCallback(req: Request, res: Response) {
    const eventId = req.body.id;

    const processed = await redis.get(`webhook:${eventId}`);
    if (processed) return res.status(200).send('Duplicate');

    await redis.setex(`webhook:${eventId}`, 3600, 'processed');

    res.status(200).send('OK');
  }
};
