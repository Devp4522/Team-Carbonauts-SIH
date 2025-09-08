import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { PrismaClient, UserRole } from '@prisma/client';
import { createError } from './errorHandler';

const prisma = new PrismaClient();

export interface AuthRequest extends Request {
  user?: {
    id: string;
    walletAddress: string;
  };
}

export const authenticateToken = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return next(createError('Access token required', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as any;
    
    // For blockchain auth, we just need the wallet address from the token
    if (!decoded.walletAddress) {
      return next(createError('Invalid token', 401));
    }

    req.user = {
      id: decoded.walletAddress,
      walletAddress: decoded.walletAddress
    };
    next();
  } catch (error) {
    next(createError('Invalid token', 401));
  }
};

// Simple wallet-based authorization (can be extended)
export const requireWallet = (req: AuthRequest, res: Response, next: NextFunction) => {
  if (!req.user?.walletAddress) {
    return next(createError('Wallet authentication required', 403));
  }
  next();
};