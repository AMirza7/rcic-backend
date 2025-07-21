// tests/testUtils.ts
import jwt from 'jsonwebtoken';

const TEST_SECRET = process.env.JWT_SECRET || 'test-secret';

export function generateTestJWT(payload: { userId: string }) {
  return jwt.sign(
    { sub: payload.userId }, 
    TEST_SECRET, 
    { expiresIn: '1h' }
  );
}
