// src/controllers/templateReviewController.ts
import { Request, Response } from 'express';
import { TemplateReview } from '../models/templatereview';

export const getAllTemplateReviews = async (req: Request, res: Response) => {
  try {
    const reviews = await TemplateReview.findAll();
    return res.json(reviews);
  } catch (error) {
    console.error('getAllTemplateReviews error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const getTemplateReviewById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const review = await TemplateReview.findByPk(id);
    if (!review) return res.status(404).json({ message: 'TemplateReview not found' });
    return res.json(review);
  } catch (error) {
    console.error('getTemplateReviewById error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const createTemplateReview = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const newReview = await TemplateReview.create(payload);
    return res.status(201).json(newReview);
  } catch (error) {
    console.error('createTemplateReview error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const updateTemplateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const payload = req.body;
    const [updated] = await TemplateReview.update(payload, { where: { id } });
    if (!updated) return res.status(404).json({ message: 'TemplateReview not found' });
    const updatedReview = await TemplateReview.findByPk(id);
    return res.json(updatedReview);
  } catch (error) {
    console.error('updateTemplateReview error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

export const deleteTemplateReview = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deleted = await TemplateReview.destroy({ where: { id } });
    if (!deleted) return res.status(404).json({ message: 'TemplateReview not found' });
    return res.status(204).send();
  } catch (error) {
    console.error('deleteTemplateReview error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};
