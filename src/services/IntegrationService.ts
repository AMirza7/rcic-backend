import { Integration } from '../models/Integration';

export class IntegrationService {
  static async create(data: Partial<Parameters<typeof Integration.create>[0]>) {
    return Integration.create(data as any);
  }

  static async getById(id: string) {
    return Integration.findByPk(id);
  }

  static async listByUser(userId: string) {
    return Integration.findAll({ where: { userId } });
  }

  static async update(id: string, updates: Partial<any>) {
    const [count, [updated]] = await Integration.update(updates, { where: { id }, returning: true });
    return { count, updated };
  }

  static async delete(id: string) {
    return Integration.destroy({ where: { id } });
  }
}
