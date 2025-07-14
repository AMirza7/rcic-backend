// src/controllers/employeeController.ts
import { Request, Response } from 'express';
import { Employee } from '../models/employee';

export const getAllEmployees = async (req: Request, res: Response) => {
  try {
    const employees = await Employee.findAll();
    return res.json(employees);
  } catch (error) {
    console.error('getAllEmployees error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const emp = await Employee.findByPk(id);
    if (!emp) return res.status(404).json({ message: 'Employee not found' });
    return res.json(emp);
  } catch (error) {
    console.error('getEmployeeById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newEmp = await Employee.create(payload);
    return res.status(201).json(newEmp);
  } catch (error) {
    console.error('createEmployee error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await Employee.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Employee not found' });
    const updatedEmp = await Employee.findByPk(id);
    return res.json(updatedEmp);
  } catch (error) {
    console.error('updateEmployee error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Employee.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Employee not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteEmployee error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
