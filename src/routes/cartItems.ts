import { Router } from 'express';
import {
  createCartItem,
  listCartItems,
  getCartItem,
  updateCartItem,
  deleteCartItem
} from '../controllers/cartItemController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router({ mergeParams: true });

router.post('/', requireAuth, createCartItem);
router.get('/', requireAuth, listCartItems);
router.get('/:id', requireAuth, getCartItem);
router.patch('/:id', requireAuth, updateCartItem);
router.delete('/:id', requireAuth, deleteCartItem);

export default router;
