import { Request, Response } from 'express';
import QRCode from 'qrcode';
import * as qrService from '../services/qrService';

const CLIENT_BASE_URL = process.env.CLIENT_BASE_URL || 'http://localhost:3000';

/**
 * GET /api/qr/:consultantId
 * - Creates & stores a code, then returns a QR PNG dataURL linking to your client app
 */
export const generateQRCode = async (req: Request, res: Response) => {
  try {
    const { consultantId } = req.params;
    // 1) Persist the code
    const connector = await qrService.createQRConnector(consultantId);
    // 2) Build deep-link URL your client app will handle
    const link = `${CLIENT_BASE_URL}/link?connectorId=${connector.id}`;
    const qrDataUrl = await QRCode.toDataURL(link);

    return res.json({
      connectorId: connector.id,
      code: connector.code,
      expiresAt: connector.expiresAt,
      qrDataUrl,
    });
  } catch (err) {
    console.error('generateQRCode error:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

/**
 * POST /api/qr/validate
 * Body: { connectorId, code }
 * - Verifies code, marks used, and returns success
 */
export const validateQRCode = async (req: Request, res: Response) => {
  try {
    const { connectorId, code } = req.body;
    await qrService.validateQRCode(connectorId, code);
    return res.json({ message: 'QR code validated successfully' });
  } catch (err: any) {
    console.error('validateQRCode error:', err);
    return res.status(400).json({ message: err.message || 'Invalid QR code' });
  }
};
