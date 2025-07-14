// src/controllers/templateController.ts
import { Request, Response } from 'express';
import { Template } from '../models/template';

export const getAllTemplates = async (req: Request, res: Response) => {
  try {
    const templates = await Template.findAll();
    return res.json(templates);
  } catch (error) {
    console.error('getAllTemplates error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTemplateById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tmpl = await Template.findByPk(id);
    if (!tmpl) return res.status(404).json({ message: 'Template not found' });
    return res.json(tmpl);
  } catch (error) {
    console.error('getTemplateById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTemplate = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newTmpl = await Template.create(payload);
    return res.status(201).json(newTmpl);
  } catch (error) {
    console.error('createTemplate error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await Template.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Template not found' });
    const updatedTmpl = await Template.findByPk(id);
    return res.json(updatedTmpl);
  } catch (error) {
    console.error('updateTemplate error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTemplate = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Template.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Template not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteTemplate error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
