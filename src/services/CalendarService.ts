import { Calendar } from '../models/Calendar';

export class CalendarService {
  static create(data: any) {
    return Calendar.create(data);
  }
  static getById(id: string) {
    return Calendar.findByPk(id, { include: ['events'] });
  }
  static list(filter = {}) {
    return Calendar.findAll({ where: filter, include: ['events'] });
  }
  static async update(id: string, updates: any) {
    const [count, [updated]] = await Calendar.update(updates, { where: { id }, returning: true });
    return { count, updated };
  }
  static delete(id: string) {
    return Calendar.destroy({ where: { id } });
  }
}
