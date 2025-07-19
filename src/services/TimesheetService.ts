import { Timesheet } from '../models/Timesheet';

export class TimesheetService {
  static create(data: any) {
    return Timesheet.create(data);
  }
  static getById(id: string) {
    return Timesheet.findByPk(id, { include: ['entries'] });
  }
  static list(filter = {}) {
    return Timesheet.findAll({ where: filter, include: ['entries'] });
  }
  static async update(id: string, updates: any) {
    const [count, [updated]] = await Timesheet.update(updates, { where: { id }, returning: true });
    return { count, updated };
  }
  static delete(id: string) {
    return Timesheet.destroy({ where: { id } });
  }
}
