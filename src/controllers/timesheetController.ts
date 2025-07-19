import { Request, Response, NextFunction } from 'express';
import { TimesheetService } from '../services/TimesheetService';

export const createTimesheet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sheet = await TimesheetService.create(req.body);
    res.status(201).json(sheet);
  } catch (err) { next(err); }
};

export const getTimesheet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sheet = await TimesheetService.getById(req.params.id);
    if (!sheet) return res.status(404).json({ message: 'Not found' });
    res.json(sheet);
  } catch (err) { next(err); }
};

export const listTimesheets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const sheets = await TimesheetService.list({ consultantId: req.query.consultantId });
    res.json(sheets);
  } catch (err) { next(err); }
};

export const updateTimesheet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await TimesheetService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteTimesheet = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await TimesheetService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
