// src/controllers/otpController.ts
import { Request, Response } from 'express';
import { Otp } from '../models/otp';

/** GET /api/otps */
export async function getAllOtps(_req: Request, res: Response) {
  try {
    const otps = await Otp.findAll();
    return res.json(otps);
  } catch (error) {
    console.error('getAllOtps error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/** GET /api/otps/:id */
export async function getOtpById(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const otp = await Otp.findByPk(id);
    if (!otp) return res.status(404).json({ message: 'Otp not found' });
    return res.json(otp);
  } catch (error) {
    console.error('getOtpById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/** POST /api/otps 
 *  Body must include: { userId, phoneNumber, code, expiresAt }
 */
export async function createOtp(req: Request, res: Response) {
  try {
    const { userId, phoneNumber, code, expiresAt } = req.body;
    const newOtp = await Otp.create({
      userId,
      phoneNumber,
      code,
      expiresAt: new Date(expiresAt),
    });
    return res.status(201).json(newOtp);
  } catch (error) {
    console.error('createOtp error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/** PUT /api/otps/:id 
 *  Body may include any subset of { userId, phoneNumber, code, expiresAt }
 */
export async function updateOtp(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const updates: Partial<{
      userId: string;
      phoneNumber: string;
      code: string;
      expiresAt: string;
    }> = req.body;

    if (updates.expiresAt) {
      updates.expiresAt = new Date(updates.expiresAt).toISOString();
    }

    const [count] = await Otp.update(updates as any, { where: { id } });
    if (!count) return res.status(404).json({ message: 'Otp not found' });

    const updated = await Otp.findByPk(id);
    return res.json(updated);
  } catch (error) {
    console.error('updateOtp error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}

/** DELETE /api/otps/:id */
export async function deleteOtp(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const count = await Otp.destroy({ where: { id } });
    if (!count) return res.status(404).json({ message: 'Otp not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteOtp error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
