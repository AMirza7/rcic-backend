// src/controllers/documentFolderController.ts
import { Request, Response } from 'express';
import { DocumentFolder } from '../models/documentfolder';

export const getAllDocumentFolders = async (req: Request, res: Response) => {
  try {
    const folders = await DocumentFolder.findAll();
    return res.json(folders);
  } catch (error) {
    console.error('getAllDocumentFolders error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getDocumentFolderById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const folder = await DocumentFolder.findByPk(id);
    if (!folder) return res.status(404).json({ message: 'DocumentFolder not found' });
    return res.json(folder);
  } catch (error) {
    console.error('getDocumentFolderById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createDocumentFolder = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newFolder = await DocumentFolder.create(payload);
    return res.status(201).json(newFolder);
  } catch (error) {
    console.error('createDocumentFolder error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateDocumentFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await DocumentFolder.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'DocumentFolder not found' });
    const updatedFolder = await DocumentFolder.findByPk(id);
    return res.json(updatedFolder);
  } catch (error) {
    console.error('updateDocumentFolder error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteDocumentFolder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await DocumentFolder.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'DocumentFolder not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteDocumentFolder error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
