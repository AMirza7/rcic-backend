// src/controllers/documentController.ts
import { Request, Response, NextFunction } from 'express';
import path from 'path';
import fs from 'fs';
import multer from 'multer';
import { Document } from '../models/document';

interface MulterRequest extends Request {
  file: Express.Multer.File;
}

// 1) Multer middleware
const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, path.join(__dirname, '../../uploads'));
  },
  filename: (_req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});
export const uploadMiddleware = multer({ storage }).single('file');

// 2) Upload handler (now with next: NextFunction)
export const uploadDocument = async (
  req: MulterRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: 'File is required' });
    }

    // pull all incoming fields as strings
    const {
      name,
      uploadedBy,
      category,
      tags,
      clientId,
      consultantId,
      isPublic,
      expiryDate,
      status,
      permissions,
      metadata,
    } = req.body as Record<string, string>;

    // parse JSON fields
    const parsedTags   = JSON.parse(tags);
    const parsedPerms  = JSON.parse(permissions);
    const parsedMeta   = JSON.parse(metadata);
    const parsedPub    = isPublic === 'true';
    const parsedExp    = expiryDate ? new Date(expiryDate) : null;

    // build the DB record
    const { filename, mimetype, size } = req.file;
    const newDoc = await Document.create({
      name,
      fileName: filename,
      fileUrl: `/uploads/${filename}`,
      fileSize: size,
      mimeType: mimetype,
      uploadDate: new Date(),
      uploadedBy,
      category,
      tags: parsedTags,
      clientId: clientId ?? null,
      consultantId,
      isPublic: parsedPub,
      expiryDate: parsedExp,
      status,
      permissions: parsedPerms,
      metadata: parsedMeta,
    });

    return res.status(201).json(newDoc);
  } catch (err) {
    console.error('uploadDocument error:', err);
    next(err);   // pass to your global error handler, or:
    // return res.status(500).json({ message: 'Internal server error' });
  }
};

// the rest are all standard RequestHandlers
export const getAllDocuments = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const docs = await Document.findAll();
    return res.json(docs);
  } catch (err) {
    console.error('getAllDocuments error:', err);
    next(err);
  }
};

export const getDocumentById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Document.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });
    return res.json(doc);
  } catch (err) {
    console.error('getDocumentById error:', err);
    next(err);
  }
};

export const downloadDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Document.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    const filePath = path.join(__dirname, '../../uploads', doc.fileName);
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found on disk' });
    }

    res.setHeader('Content-Type', doc.mimeType);
    res.setHeader('Content-Disposition', `attachment; filename="${doc.name}"`);
    res.sendFile(filePath);
  } catch (err) {
    console.error('downloadDocument error:', err);
    next(err);
  }
};

export const deleteDocument = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const doc = await Document.findByPk(req.params.id);
    if (!doc) return res.status(404).json({ message: 'Document not found' });

    const filePath = path.join(__dirname, '../../uploads', doc.fileName);
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await Document.destroy({ where: { id: req.params.id } });
    return res.status(204).send();
  } catch (err) {
    console.error('deleteDocument error:', err);
    next(err);
  }
};
