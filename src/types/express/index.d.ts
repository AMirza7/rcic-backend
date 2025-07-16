// src/types/express/index.d.ts
import 'express';
import { UserAttributes } from '../../models/user';

// only these two properties travel on req.user
export type AuthUser = Pick<UserAttributes, 'id' | 'role'>;

declare module 'express-serve-static-core' {
  interface Request {
    user: AuthUser;
  }
}
