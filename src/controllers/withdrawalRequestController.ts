import { Request, Response, NextFunction } from 'express';
import { WithdrawalRequestService } from '../services/WithdrawalRequestService';

export const createWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wr = await WithdrawalRequestService.create(req.body);
    res.status(201).json(wr);
  } catch (err) {
    next(err);
  }
};

export const getWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wr = await WithdrawalRequestService.getById(req.params.id);
    if (!wr) return res.status(404).json({ message: 'Not found' });
    res.json(wr);
  } catch (err) {
    next(err);
  }
};

export const listWithdrawals = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const wrs = await WithdrawalRequestService.list({
      userId: req.query.userId as string,
      status: req.query.status as any
    });
    res.json(wrs);
  } catch (err) {
    next(err);
  }
};

export const updateWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await WithdrawalRequestService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteWithdrawal = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await WithdrawalRequestService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
