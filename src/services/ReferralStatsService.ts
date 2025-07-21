import { ReferralStats } from '../models/ReferralStats';

export class ReferralStatsService {
  /** Fetch stats for a given consultant (userId) */
  static async getStatsForUser(userId: string): Promise<ReferralStats | null> {
    return ReferralStats.findOne({ where: { userId } });
  }

  /** Update or insert stats (upsert) */
  static async upsertStats(data: Partial<ReferralStats>): Promise<[ReferralStats, boolean]> {
    return ReferralStats.upsert(data as any);
  }

  // optionally: methods to compute/refresh thisMonth/lastMonth, conversionRate, etc.
}
