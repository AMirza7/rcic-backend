import { Request, Response } from 'express';
import { DocumentPermission } from '../models/documentpermission';

/**
 * POST /api/document-permissions
 */
export async function createDocumentPermission(req: Request, res: Response) {
  try {
    const { documentId, userId, canView, canEdit, canDelete } = req.body;
    const perm = await DocumentPermission.create({
      documentId,
      userId,
      canView,
      canEdit,
      canDelete
    });
    return res.status(201).json({ success: true, data: perm });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/document-permissions
 */
export async function listDocumentPermissions(req: Request, res: Response) {
  try {
    const perms = await DocumentPermission.findAll();
    return res.json({ success: true, data: perms });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * GET /api/document-permissions/:id
 */
export async function getDocumentPermission(req: Request, res: Response) {
  try {
    const perm = await DocumentPermission.findByPk(req.params.id);
    if (!perm) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, data: perm });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * PATCH /api/document-permissions/:id
 */
export async function updateDocumentPermission(req: Request, res: Response) {
  try {
    const perm = await DocumentPermission.findByPk(req.params.id);
    if (!perm) return res.status(404).json({ success: false, message: 'Not found' });
    await perm.update(req.body);
    return res.json({ success: true, data: perm });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}

/**
 * DELETE /api/document-permissions/:id
 */
export async function deleteDocumentPermission(req: Request, res: Response) {
  try {
    const deleted = await DocumentPermission.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ success: false, message: 'Not found' });
    return res.json({ success: true, message: 'Deleted' });
  } catch (err: any) {
    return res.status(500).json({ success: false, error: err.message });
  }
}
