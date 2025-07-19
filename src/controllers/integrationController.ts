import { Request, Response, NextFunction } from 'express';
import { IntegrationService } from '../services/IntegrationService';

export const createIntegration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const integration = await IntegrationService.create(req.body);
    res.status(201).json(integration);
  } catch (err) {
    next(err);
  }
};

export const getIntegration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const integration = await IntegrationService.getById(req.params.id);
    if (!integration) return res.status(404).json({ message: 'Not found' });
    res.json(integration);
  } catch (err) {
    next(err);
  }
};

export const listIntegrations = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const integrations = await IntegrationService.listByUser(req.query.userId as string);
    res.json(integrations);
  } catch (err) {
    next(err);
  }
};

export const updateIntegration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { count, updated } = await IntegrationService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteIntegration = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await IntegrationService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
