// src/controllers/clientController.ts
import { Request, Response } from 'express';
import { Client } from '../models/client';

export const getAllClients = async (req: Request, res: Response) => {
  try {
    const clients = await Client.findAll();
    return res.json(clients);
  } catch (error) {
    console.error('getAllClients error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const client = await Client.findByPk(id);
    if (!client) return res.status(404).json({ message: 'Client not found' });
    return res.json(client);
  } catch (error) {
    console.error('getClientById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createClient = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newClient = await Client.create(payload);
    return res.status(201).json(newClient);
  } catch (error) {
    console.error('createClient error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await Client.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'Client not found' });
    const updatedClient = await Client.findByPk(id);
    return res.json(updatedClient);
  } catch (error) {
    console.error('updateClient error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteClient = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await Client.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'Client not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteClient error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
