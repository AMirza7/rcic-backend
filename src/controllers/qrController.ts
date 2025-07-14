// src/controllers/qrController.ts
import { Request, Response } from 'express';
import QRCode from 'qrcode';
import { Consultant } from '../models/consultant';
import { Client } from '../models/client';

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL || 'http://localhost:3000';

export const generateQRCode = async (req: Request, res: Response) => {
  try {
    const { consultantId } = req.params;
    const consultant = await Consultant.findByPk(consultantId);
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }

    // The link your client app will handle to perform the linking flow
    const link = `${CLIENT_BASE_URL}/link?consultantId=${consultantId}`;
    const qrDataUrl = await QRCode.toDataURL(link);

    // Return as a base64 PNG data URL
    return res.json({ qrDataUrl });
  } catch (error) {
    console.error('generateQRCode error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const linkClientToConsultant = async (req: Request, res: Response) => {
  try {
    const { consultantId, clientId } = req.body;
    // Validate both exist
    const consultant = await Consultant.findByPk(consultantId);
    if (!consultant) {
      return res.status(404).json({ message: 'Consultant not found' });
    }
    const client = await Client.findByPk(clientId);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }

    // Associate
    await client.update({ consultantId });
    return res.json({ message: 'Client linked', client });
  } catch (error) {
    console.error('linkClientToConsultant error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
