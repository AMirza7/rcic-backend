import { Request, Response, NextFunction } from 'express';
import { AuditLogService } from '../services/AuditLogService';

export const createAuditLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const log = await AuditLogService.create(req.body);
    res.status(201).json(log);
  } catch (err) { next(err); }
};

export const getAuditLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const log = await AuditLogService.getById(req.params.id);
    if (!log) return res.status(404).json({ message: 'Not found' });
    res.json(log);
  } catch (err) { next(err); }
};

export const listAuditLogs = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const logs = await AuditLogService.list({
      userId: req.query.userId,
      entity: req.query.entity
    });
    res.json(logs);
  } catch (err) { next(err); }
};

export const updateAuditLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await AuditLogService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteAuditLog = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await AuditLogService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
