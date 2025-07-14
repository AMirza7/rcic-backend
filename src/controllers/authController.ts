import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { randomUUID } from 'crypto';

import { User, UserCreationAttributes } from '../models/user';
import { AuthToken, AuthTokenCreationAttributes } from '../models/authtoken';


const JWT_SECRET = process.env.JWT_SECRET!;
const TOKEN_EXPIRY = '7d';
const REFRESH_TOKEN_EXPIRY_DAYS = 30;

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, mobileNumber, role } = req.body as {
      email: string;
      password: string;
      mobileNumber: string;
      role: 'admin' | 'consultant' | 'client' | 'employee';
    };

    if (await User.findOne({ where: { email } })) {
      return res.status(409).json({ message: 'Email already in use' });
    }

    const passwordHash = await bcrypt.hash(password, 10);
    const payload: UserCreationAttributes = {
      email,
      passwordHash,
      mobileNumber,
      role,
    };
    const user = await User.create(payload);

    return res.status(201).json({
      id: user.id,
      email: user.email,
      role: user.role,
    });
  } catch (err) {
    console.error('register error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ where: { email } });
    if (!user || !(await bcrypt.compare(password, user.passwordHash))) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    const accessToken = jwt.sign(
      { sub: user.id, role: user.role },
      JWT_SECRET,
      { expiresIn: TOKEN_EXPIRY }
    );

    const refreshToken = randomUUID();
    const expiresAt = new Date(
      Date.now() + REFRESH_TOKEN_EXPIRY_DAYS * 24 * 60 * 60 * 1000
    );

    const authPayload: AuthTokenCreationAttributes = {
      userId: user.id,
      token: accessToken,
      refreshToken,
      expiresAt,
    };
    await AuthToken.create(authPayload);
    await user.update({ lastLogin: new Date() });

    return res.json({
      accessToken,
      refreshToken,
      user: { id: user.id, email: user.email, role: user.role },
    });
  } catch (err) {
    console.error('login error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      const token = authHeader.slice(7);
      await AuthToken.destroy({ where: { token } });
    }
    if (req.body?.refreshToken) {
      await AuthToken.destroy({ where: { refreshToken: req.body.refreshToken } });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('logout error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
