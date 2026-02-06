import pool from '../utils/database';
import { Product } from '../models/Product';

export class ProductsService {
  static async getProducts(params: any): Promise<Product[]> {
    let query = 'SELECT * FROM products WHERE 1=1';
    const values: any[] = [];

    if (params.search) {
      query += ' AND name LIKE ?';
      values.push(`%${params.search}%`);
    }
    if (params.category) {
      query += ' AND category = ?';
      values.push(params.category);
    }
    if (params.minPrice) {
      query += ' AND price >= ?';
      values.push(params.minPrice);
    }
    if (params.maxPrice) {
      query += ' AND price <= ?';
      values.push(params.maxPrice);
    }
    if (params.cursor) {
      query += ' AND id > ?';
      values.push(params.cursor);
    }

    query += ` ORDER BY ${params.sort || 'createdAt'} LIMIT ${params.limit || 20}`;

    const [rows] = await pool.execute(query, values);
    return rows as Product[];
  }
}