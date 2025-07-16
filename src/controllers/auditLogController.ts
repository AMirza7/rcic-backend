import { Request, Response } from 'express';
import { AuditLog } from '../models/auditlog';

/**
 * GET /api/audit-logs
 * Admin‑only: list all logs with optional filters
 */
export async function listAuditLogs(req: Request, res: Response) {
  try {
    const { entity, userId, action } = req.query;
    const where: any = {};
    if (entity) where.entity = entity;
    if (userId) where.userId = userId;
    if (action) where.action = action;
    const logs = await AuditLog.findAll({ where, order: [['createdAt', 'DESC']] });
    return res.json({ success: true, data: logs });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/audit-logs/:id
 */
export async function getAuditLog(req: Request, res: Response) {
  try {
    const log = await AuditLog.findByPk(req.params.id);
    if (!log) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: log });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
