// src/controllers/shoppingCartController.ts
import { Request, Response } from 'express';
import { ShoppingCart } from '../models/shoppingcart';

export const getAllShoppingCarts = async (_req: Request, res: Response) => {
  try {
    const carts = await ShoppingCart.findAll();
    return res.json(carts);
  } catch (error) {
    console.error('getAllShoppingCarts error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getShoppingCartByUser = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const cart = await ShoppingCart.findOne({ where: { userId } });
    if (!cart) {
      return res.status(404).json({ message: 'ShoppingCart not found' });
    }
    return res.json(cart);
  } catch (error) {
    console.error('getShoppingCartByUser error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createShoppingCart = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newCart = await ShoppingCart.create(payload);
    return res.status(201).json(newCart);
  } catch (error) {
    console.error('createShoppingCart error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateShoppingCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const payload = req.body;
    const [updatedCount] = await ShoppingCart.update(payload, {
      where: { userId },
    });
    if (updatedCount === 0) {
      return res.status(404).json({ message: 'ShoppingCart not found' });
    }
    const updatedCart = await ShoppingCart.findOne({ where: { userId } });
    return res.json(updatedCart);
  } catch (error) {
    console.error('updateShoppingCart error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteShoppingCart = async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const deletedCount = await ShoppingCart.destroy({
      where: { userId },
    });
    if (deletedCount === 0) {
      return res.status(404).json({ message: 'ShoppingCart not found' });
    }
    return res.status(204).send();
  } catch (error) {
    console.error('deleteShoppingCart error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
