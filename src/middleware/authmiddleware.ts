import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/authService';

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token || !(await AuthService.validateToken(token))) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  next();
};