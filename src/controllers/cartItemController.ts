import { Request, Response } from 'express';
import { CartItem } from '../models/cartitem';
import { ShoppingCart } from '../models/shoppingcart';

/**
 * POST /api/carts/:cartId/items
 */
export async function createCartItem(req: Request, res: Response) {
  try {
    const { cartId } = req.params;
    const { templateId, price, currency, quantity, expiresAt } = req.body;

    const cart = await ShoppingCart.findByPk(cartId);
    if (!cart) {
      return res.status(404).json({ success: false, message: 'Cart not found' });
    }

    const item = await CartItem.create({
      cartId,
      templateId,
      price,
      currency,
      quantity,
      expiresAt
    });
    return res.status(201).json({ success: true, data: item });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/carts/:cartId/items
 */
export async function listCartItems(req: Request, res: Response) {
  try {
    const { cartId } = req.params;
    const items = await CartItem.findAll({ where: { cartId } });
    return res.json({ success: true, data: items });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/carts/:cartId/items/:id
 */
export async function getCartItem(req: Request, res: Response) {
  try {
    const { cartId, id } = req.params;
    const item = await CartItem.findOne({ where: { id, cartId } });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.json({ success: true, data: item });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/carts/:cartId/items/:id
 */
export async function updateCartItem(req: Request, res: Response) {
  try {
    const { cartId, id } = req.params;
    const updates = req.body;
    const item = await CartItem.findOne({ where: { id, cartId } });
    if (!item) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    await item.update(updates);
    return res.json({ success: true, data: item });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/carts/:cartId/items/:id
 */
export async function deleteCartItem(req: Request, res: Response) {
  try {
    const { cartId, id } = req.params;
    const deleted = await CartItem.destroy({ where: { id, cartId } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Item not found' });
    }
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
