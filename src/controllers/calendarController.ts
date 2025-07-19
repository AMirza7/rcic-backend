import { Request, Response, NextFunction } from 'express';
import { CalendarService } from '../services/CalendarService';

export const createCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cal = await CalendarService.create(req.body);
    res.status(201).json(cal);
  } catch (err) { next(err); }
};

export const getCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const cal = await CalendarService.getById(req.params.id);
    if (!cal) return res.status(404).json({ message: 'Not found' });
    res.json(cal);
  } catch (err) { next(err); }
};

export const listCalendars = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await CalendarService.list({ consultantId: req.query.consultantId });
    res.json(list);
  } catch (err) { next(err); }
};

export const updateCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await CalendarService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteCalendar = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await CalendarService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
