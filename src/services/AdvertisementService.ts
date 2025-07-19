// src/services/AdvertisementService.ts

import { Advertisement, AdvertisementAttributes } from '../models/Advertisement';

export class AdvertisementService {
  /** Create a new ad */
  static async create(data: AdvertisementAttributes): Promise<Advertisement> {
    return Advertisement.create(data as any);
  }

  /** Fetch one ad by its ID */
  static async getById(id: string): Promise<Advertisement | null> {
    return Advertisement.findByPk(id);
  }

  /** List ads, optionally filtered by campaign or advertiser */
  static async list(filter: {
    campaignId?: string;
    advertiserId?: string;
    status?: AdvertisementAttributes['status'];
  } = {}): Promise<Advertisement[]> {
    return Advertisement.findAll({ where: filter });
  }

  /** Update an ad */
  static async update(
    id: string,
    updates: Partial<AdvertisementAttributes>
  ): Promise<[number, Advertisement[]]> {
    return Advertisement.update(updates, { where: { id }, returning: true });
  }

  /** Delete an ad */
  static async delete(id: string): Promise<number> {
    return Advertisement.destroy({ where: { id } });
  }
}
