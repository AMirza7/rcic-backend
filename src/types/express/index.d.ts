// src/types/express/index.d.ts
export {}; // make this an ES module so `declare global` works

/**
 * AuthUser is the subset of your UserAttributes you put on req.user
 * we pull it in via an import-type so TS stays happy.
 */
type AuthUser = Pick<import('../../models/user').UserAttributes, 'id' | 'role'>;

declare global {
  namespace Express {
    interface Request {
      /** set by your authMiddleware */
      user: AuthUser;
    }
  }
}
