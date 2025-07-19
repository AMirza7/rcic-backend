import { Request, Response, NextFunction } from 'express';
import { DashboardWidgetService } from '../services/DashboardWidgetService';

export const createWidget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const widget = await DashboardWidgetService.create(req.body);
    res.status(201).json(widget);
  } catch (err) {
    next(err);
  }
};

export const getWidget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const widget = await DashboardWidgetService.getById(req.params.id);
    if (!widget) return res.status(404).json({ message: 'Not found' });
    res.json(widget);
  } catch (err) {
    next(err);
  }
};

export const listWidgets = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const widgets = await DashboardWidgetService.listByUser(req.query.userId as string);
    res.json(widgets);
  } catch (err) {
    next(err);
  }
};

export const updateWidget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await DashboardWidgetService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteWidget = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await DashboardWidgetService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
