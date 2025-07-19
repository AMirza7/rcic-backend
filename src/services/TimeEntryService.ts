import { TimeEntry } from '../models/TimeEntry';

export class TimeEntryService {
  static create(data: any) {
    return TimeEntry.create(data);
  }
  static getById(id: string) {
    return TimeEntry.findByPk(id);
  }
  static list(filter = {}) {
    return TimeEntry.findAll({ where: filter });
  }
  static async update(id: string, updates: any) {
    const [count, [updated]] = await TimeEntry.update(updates, { where: { id }, returning: true });
    return { count, updated };
  }
  static delete(id: string) {
    return TimeEntry.destroy({ where: { id } });
  }
}
