// src/controllers/authTokenController.ts
import { Request, Response } from 'express';
import { AuthToken } from '../models/authtoken';

export const getAllAuthTokens = async (req: Request, res: Response) => {
  try {
    const tokens = await AuthToken.findAll();
    return res.json(tokens);
  } catch (error) {
    console.error('getAllAuthTokens error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getAuthTokenById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const token = await AuthToken.findByPk(id);
    if (!token) return res.status(404).json({ message: 'AuthToken not found' });
    return res.json(token);
  } catch (error) {
    console.error('getAuthTokenById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createAuthToken = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newToken = await AuthToken.create(payload);
    return res.status(201).json(newToken);
  } catch (error) {
    console.error('createAuthToken error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateAuthToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await AuthToken.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'AuthToken not found' });
    const updatedToken = await AuthToken.findByPk(id);
    return res.json(updatedToken);
  } catch (error) {
    console.error('updateAuthToken error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteAuthToken = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await AuthToken.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'AuthToken not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteAuthToken error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
