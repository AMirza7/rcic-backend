// src/controllers/userLanguageController.ts
import { Request, Response } from 'express';
import { UserLanguagePreference } from '../models/UserLanguagePreference';

export const createUserLanguage = async (req: Request, res: Response) => {
  const { userId, language } = req.body as { userId: string; language: string };
  try {
    const pref = await UserLanguagePreference.create({ userId, language });
    return res.status(201).json(pref);
  } catch (err) {
    console.error('createUserLanguage error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getUserLanguage = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const pref = await UserLanguagePreference.findOne({ where: { userId } });
    if (!pref) {
      return res.status(404).json({ message: 'Language preference not found' });
    }
    return res.json(pref);
  } catch (err) {
    console.error('getUserLanguage error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateUserLanguage = async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { language } = req.body as { language: string };
  try {
    const [count] = await UserLanguagePreference.update(
      { language },
      { where: { userId } }
    );
    if (count === 0) {
      return res.status(404).json({ message: 'Language preference not found' });
    }
    const updated = await UserLanguagePreference.findOne({ where: { userId } });
    return res.json(updated);
  } catch (err) {
    console.error('updateUserLanguage error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteUserLanguage = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const deleted = await UserLanguagePreference.destroy({ where: { userId } });
    if (deleted === 0) {
      return res.status(404).json({ message: 'Language preference not found' });
    }
    return res.status(204).send();
  } catch (err) {
    console.error('deleteUserLanguage error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
