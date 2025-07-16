// src/controllers/employeeController.ts
import { Request, Response } from 'express';
import { Employee } from '../models/employee';

/**
 * GET /api/employees
 */
export async function listEmployees(req: Request, res: Response) {
  try {
    const employees = await Employee.findAll();
    return res.json({ success: true, data: employees });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/employees/:id
 */
export async function getEmployee(req: Request, res: Response) {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: emp });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * POST /api/employees
 */
export async function addEmployee(req: Request, res: Response) {
  try {
    const emp = await Employee.create(req.body);
    return res.status(201).json({ success: true, data: emp });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/employees/:id
 */
export async function editEmployee(req: Request, res: Response) {
  try {
    const emp = await Employee.findByPk(req.params.id);
    if (!emp) return res.status(404).json({ success: false, message: 'Not found' });
    await emp.update(req.body);
    return res.json({ success: true, data: emp });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/employees/:id
 */
export async function removeEmployee(req: Request, res: Response) {
  try {
    const deleted = await Employee.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
