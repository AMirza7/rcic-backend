import { Request, Response, NextFunction } from 'express';
import { CalendarEventService } from '../services/CalendarEventService';

export const createCalendarEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ev = await CalendarEventService.create(req.body);
    res.status(201).json(ev);
  } catch (err) { next(err); }
};

export const getCalendarEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ev = await CalendarEventService.getById(req.params.id);
    if (!ev) return res.status(404).json({ message: 'Not found' });
    res.json(ev);
  } catch (err) { next(err); }
};

export const listCalendarEvents = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const list = await CalendarEventService.list({ calendarId: req.query.calendarId });
    res.json(list);
  } catch (err) { next(err); }
};

export const updateCalendarEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await CalendarEventService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) { next(err); }
};

export const deleteCalendarEvent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await CalendarEventService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) { next(err); }
};
