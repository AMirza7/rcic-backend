// src/controllers/otpController.ts
import { Request, Response } from 'express';
import { Otp } from '../models/otp';

export const getAllOtps = async (req: Request, res: Response) => {
  try {
    const otps = await Otp.findAll();
    return res.json(otps);
  } catch (error) {
    console.error('getAllOtps error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getOtpById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const otp = await Otp.findByPk(id);
    if (!otp) return res.status(404).json({ message: 'Otp not found' });
    return res.json(otp);
  } catch (error) {
    console.error('getOtpById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createOtp = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newOtp = await Otp.create(payload);
    return res.status(201).json(newOtp);
  } catch (error) {
    console.error('createOtp error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateOtp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await Otp.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Otp not found' });
    const updatedOtp = await Otp.findByPk(id);
    return res.json(updatedOtp);
  } catch (error) {
    console.error('updateOtp error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteOtp = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Otp.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Otp not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteOtp error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
