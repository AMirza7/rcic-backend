// src/middleware/authMiddleware.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { AuthToken } from '../models/authtoken';
import { User } from '../models/user';

const JWT_SECRET = process.env.JWT_SECRET!;

// Extend Express Request with `user`
declare global {
  namespace Express {
    interface Request {
      user?: { id: string; role: string };
    }
  }
}

/**
 * requireAuth
 * - Verifies a Bearer token exists, is valid, not expired (in AuthToken table)
 * - Attaches `req.user = { id, role }`
 */
export const requireAuth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const auth = req.headers.authorization;
    if (!auth?.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'Authorization header missing or malformed' });
    }

    const token = auth.slice(7);
    // Check token in DB
    const stored = await AuthToken.findOne({ where: { token } });
    if (!stored) {
      return res.status(401).json({ message: 'Token not recognized (logged out?)' });
    }

    // Verify signature & expiry
    const payload = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    const user = await User.findByPk(payload.sub as string);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists' });
    }

    req.user = { id: user.id, role: user.role };
    return next();
  } catch (err) {
    console.error('requireAuth error:', err);
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};

/**
 * requireRole
 * - Ensures the authenticated user has one of the allowed roles
 */
export const requireRole = (...allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: 'Not authenticated' });
    }
    if (!allowedRoles.includes(user.role)) {
      return res.status(403).json({ message: 'Insufficient privileges' });
    }
    return next();
  };
};
