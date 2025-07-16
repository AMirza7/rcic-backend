import { Request, Response } from 'express';
import { ConnectionRequest } from '../models/connectionrequest';

/**
 * POST /api/connection-requests
 */
export async function createConnectionRequest(req: Request, res: Response) {
  try {
    const { consultantId } = req.body;
    const clientId = req.user.id; // assuming req.user set by authMiddleware
    const request = await ConnectionRequest.create({ clientId, consultantId });
    return res.status(201).json({ success: true, data: request });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/connection-requests
 */
export async function listConnectionRequests(req: Request, res: Response) {
  try {
    const requests = await ConnectionRequest.findAll({
      where: { clientId: req.user.id } // or remove filter for admin
    });
    return res.json({ success: true, data: requests });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/connection-requests/:id
 */
export async function getConnectionRequestById(req: Request, res: Response) {
  try {
    const reqId = req.params.id;
    const request = await ConnectionRequest.findByPk(reqId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.json({ success: true, data: request });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/connection-requests/:id
 */
export async function updateConnectionRequestStatus(req: Request, res: Response) {
  try {
    const reqId = req.params.id;
    const { status } = req.body;
    const request = await ConnectionRequest.findByPk(reqId);
    if (!request) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    request.status = status;
    await request.save();
    return res.json({ success: true, data: request });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/connection-requests/:id
 */
export async function deleteConnectionRequest(req: Request, res: Response) {
  try {
    const reqId = req.params.id;
    const deleted = await ConnectionRequest.destroy({ where: { id: reqId } });
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Not found' });
    }
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
