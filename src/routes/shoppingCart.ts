// src/routes/shoppingCart.ts
import { Router } from 'express';
import {
  getAllShoppingCarts,
  getShoppingCartByUser,
  createShoppingCart,
  updateShoppingCart,
  deleteShoppingCart,
} from '../controllers/shoppingCartController';
import { validateBody, validateParams } from '../middleware/validate';
import { z } from 'zod';
import {
  createShoppingCartSchema,
  updateShoppingCartSchema,
} from '../schemas/shoppingCartSchemas';

const router = Router();

// UUID validation for :id param
const idParamSchema = z.object({
  id: z.string().uuid({ message: 'id must be a valid UUID' }),
});

router.get('/', getAllShoppingCarts);

router.get(
  '/:id',
  validateParams(idParamSchema, 'params'),
  getShoppingCartByUser
);

router.post(
  '/',
  validateBody(createShoppingCartSchema),
  createShoppingCart
);

router.put(
  '/:id',
  validateParams(idParamSchema, 'params'),
  validateBody(updateShoppingCartSchema),
  updateShoppingCart
);

router.delete(
  '/:id',
  validateParams(idParamSchema, 'params'),
  deleteShoppingCart
);

export default router;
