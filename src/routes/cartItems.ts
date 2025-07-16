// src/routes/cartItems.ts
import { Router } from 'express';
import {
  createCartItem,
  listCartItems,
  getCartItem,
  updateCartItem,
  deleteCartItem,
} from '../controllers/cartItemController';
import { requireAuth } from '../middleware/authMiddleware';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createCartItemSchema,
  updateCartItemSchema,
} from '../schemas/cartItemSchemas';

const router = Router({ mergeParams: true });

// UUID validation for :cartId and :id params
const cartIdParam = z.object({
  cartId: z.string().uuid({ message: 'cartId must be a valid UUID' }),
});
const idParam = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.post(
  '/',
  requireAuth,
  validateParams(cartIdParam, 'params'),
  validateBody(createCartItemSchema),
  createCartItem
);

router.get(
  '/',
  requireAuth,
  validateParams(cartIdParam, 'params'),
  listCartItems
);

router.get(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  getCartItem
);

router.patch(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  validateBody(updateCartItemSchema),
  updateCartItem
);

router.delete(
  '/:id',
  requireAuth,
  validateParams(idParam, 'params'),
  deleteCartItem
);

export default router;
