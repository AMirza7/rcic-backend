import { Request, Response, NextFunction } from 'express';
import { ReferralDataService } from '../services/ReferralDataService';

export const createReferral = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ref = await ReferralDataService.create(req.body);
    res.status(201).json(ref);
  } catch (err) {
    next(err);
  }
};

export const getReferral = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ref = await ReferralDataService.getById(req.params.id);
    if (!ref) return res.status(404).json({ message: 'Not found' });
    res.json(ref);
  } catch (err) {
    next(err);
  }
};

export const listReferrals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const refs = await ReferralDataService.list({
      referrerId: req.query.referrerId as string,
      status: req.query.status as any
    });
    res.json(refs);
  } catch (err) {
    next(err);
  }
};

export const updateReferral = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await ReferralDataService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteReferral = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await ReferralDataService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
