import { CalendarEvent } from '../models/CalendarEvent';

export class CalendarEventService {
  static create(data: any) {
    return CalendarEvent.create(data);
  }
  static getById(id: string) {
    return CalendarEvent.findByPk(id);
  }
  static list(filter = {}) {
    return CalendarEvent.findAll({ where: filter });
  }
  static async update(id: string, updates: any) {
    const [count, [updated]] = await CalendarEvent.update(updates, { where: { id }, returning: true });
    return { count, updated };
  }
  static delete(id: string) {
    return CalendarEvent.destroy({ where: { id } });
  }
}
