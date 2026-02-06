import { Request, Response } from 'express';
import { AuthService } from '../services/authService';

export const AuthController = {
  async getToken(req: Request, res: Response) {
    try {
      const token = await AuthService.getToken();
      res.json({ access_token: token });
    } catch {
      res.status(500).json({ error: 'Failed to get token' });
    }
  }
};
