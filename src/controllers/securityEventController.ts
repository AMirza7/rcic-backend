import { Request, Response, NextFunction } from 'express';
import { SecurityEventService } from '../services/SecurityEventService';

export const createSecurityEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ev = await SecurityEventService.create(req.body);
    res.status(201).json(ev);
  } catch (err) { next(err); }
};

export const getSecurityEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ev = await SecurityEventService.getById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Not found' });
    res.json(ev);
  } catch (err) { next(err); }
};

export const listSecurityEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const evs = await SecurityEventService.list({
      userId: req.query.userId
    });
    res.json(evs);
  } catch (err) { next(err); }
};

export const updateSecurityEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await SecurityEventService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteSecurityEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await SecurityEventService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
