import { SecurityEvent } from '../models/SecurityEvent';

export class SecurityEventService {
  static create(data: any) {
    return SecurityEvent.create(data);
  }
  static getById(id: string) {
    return SecurityEvent.findByPk(id);
  }
  static list(filter = {}) {
    return SecurityEvent.findAll({ where: filter, order: [['createdAt','DESC']] });
  }
  static async update(id: string, updates: any) {
    const [count, [updated]] = await SecurityEvent.update(updates, { where:{id}, returning: true });
    return { count, updated };
  }
  static delete(id: string) {
    return SecurityEvent.destroy({ where:{id} });
  }
}
