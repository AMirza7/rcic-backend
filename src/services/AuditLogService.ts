import { AuditLog } from '../models/auditlog';

export class AuditLogService {
  static create(data: any) {
    return AuditLog.create(data);
  }
  static getById(id: string) {
    return AuditLog.findByPk(id);
  }
  static list(filter = {}) {
    return AuditLog.findAll({ where: filter, order: [['timestamp','DESC']] });
  }
  static async update(id: string, updates: any) {
    const [count, [updated]] = await AuditLog.update(updates, { where:{id}, returning: true });
    return { count, updated };
  }
  static delete(id: string) {
    return AuditLog.destroy({ where:{id} });
  }
}
