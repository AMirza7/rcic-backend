import { Request, Response, NextFunction } from 'express';
import { TimeEntryService } from '../services/TimeEntryService';

export const createTimeEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entry = await TimeEntryService.create(req.body);
    res.status(201).json(entry);
  } catch (err) { next(err); }
};

export const getTimeEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entry = await TimeEntryService.getById(req.params.id);
    if (!entry) return res.status(404).json({ message: 'Not found' });
    res.json(entry);
  } catch (err) { next(err); }
};

export const listTimeEntries = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const entries = await TimeEntryService.list({ timesheetId: req.query.timesheetId });
    res.json(entries);
  } catch (err) { next(err); }
};

export const updateTimeEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await TimeEntryService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteTimeEntry = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await TimeEntryService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
