import { ReferralData, ReferralDataAttributes } from '../models/ReferralData';

export class ReferralDataService {
  static async create(data: Partial<ReferralDataAttributes>) {
    return ReferralData.create(data as any);
  }

  static async getById(id: string) {
    return ReferralData.findByPk(id);
  }

  static async list(filter: {
    referrerId?: string;
    status?: ReferralDataAttributes['status'];
  } = {}) {
    return ReferralData.findAll({ where: filter });
  }

  static async update(
    id: string,
    updates: Partial<ReferralDataAttributes>
  ) {
    const [count, [updated]] = await ReferralData.update(updates, {
      where: { id },
      returning: true
    });
    return { count, updated };
  }

  static async delete(id: string) {
    return ReferralData.destroy({ where: { id } });
  }
}
