// src/controllers/adsController.ts
import { Request, Response, NextFunction } from 'express';
import { AdvertisementService } from '../services/AdvertisementService';

export const createAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ad = await AdvertisementService.create(req.body);
    res.status(201).json(ad);
  } catch (err) {
    next(err);
  }
};

export const getAdById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const ad = await AdvertisementService.getById(req.params.id);
    if (!ad) return res.status(404).json({ message: 'Advertisement not found' });
    res.json(ad);
  } catch (err) {
    next(err);
  }
};

export const listAds = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filter = {
      advertiserId: req.query.advertiserId as string,
      status: req.query.status as any,
      campaignId: req.query.campaignId as string
    };
    const ads = await AdvertisementService.list(filter);
    res.json(ads);
  } catch (err) {
    next(err);
  }
};

export const updateAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const [count, [updated]] = await AdvertisementService.update(req.params.id, req.body);
    if (count === 0) return res.status(404).json({ message: 'Advertisement not found' });
    res.json(updated);
  } catch (err) {
    next(err);
  }
};

export const deleteAd = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const count = await AdvertisementService.delete(req.params.id);
    if (count === 0) return res.status(404).json({ message: 'Advertisement not found' });
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
