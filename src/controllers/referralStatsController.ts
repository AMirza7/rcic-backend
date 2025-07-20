import { Request, Response, NextFunction } from 'express';
import { ReferralStatsService } from '../services/ReferralStatsService';

/**
 * GET /api/consultant/referral/analytics
 * Returns the ReferralStats record for the authenticated consultant
 */
export const getConsultantReferralAnalytics = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user.id;
    const stats = await ReferralStatsService.getStatsForUser(userId);
    if (!stats) {
      return res.status(404).json({ message: 'No referral stats found for this user.' });
    }
    res.json(stats);
  } catch (err) {
    next(err);
  }
};
