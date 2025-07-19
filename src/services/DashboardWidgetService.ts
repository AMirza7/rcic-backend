import { DashboardWidget } from '../models/DashboardWidget';

export class DashboardWidgetService {
  static async create(data: Partial<Parameters<typeof DashboardWidget.create>[0]>) {
    return DashboardWidget.create(data as any);
  }

  static async getById(id: string) {
    return DashboardWidget.findByPk(id);
  }

  static async listByUser(userId: string) {
    return DashboardWidget.findAll({ where: { userId } });
  }

  static async update(id: string, updates: Partial<any>) {
    const [count, [updated]] = await DashboardWidget.update(updates, { where: { id }, returning: true });
    return { count, updated };
  }

  static async delete(id: string) {
    return DashboardWidget.destroy({ where: { id } });
  }
}
