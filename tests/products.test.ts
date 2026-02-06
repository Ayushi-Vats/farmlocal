import { ProductsService } from '../src/services/productsService';

describe('ProductsService', () => {
  it('should fetch products', async () => {
    const products = await ProductsService.getProducts({ limit: 10 });
    expect(products.length).toBeLessThanOrEqual(10);
  });
});