import { Request, Response } from 'express';
import { ProductsService } from '../services/productsService';
import redis from '../utils/redis';

export const ProductsController = {
  async getProducts(req: Request, res: Response) {
    try {
      const params = req.query;
      const cacheKey = `products:${JSON.stringify(params)}`;

      let products: any = await redis.get(cacheKey);

      if (!products) {
        products = await ProductsService.getProducts(params);
        await redis.setex(cacheKey, 300, JSON.stringify(products));
      } else {
        products = JSON.parse(products);
      }

      res.json(products);
    } catch {
      res.status(500).json({ error: 'Failed to fetch products' });
    }
  }
};
