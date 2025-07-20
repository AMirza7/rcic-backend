import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { z } from 'zod';
import { caseAnalysisParamsSchema } from '../schemas/aiSchemas';
import { getCaseAnalysis } from '../controllers/caseAnalysisController';

const router = Router();
router.use(requireAuth);

router.get(
  '/case-analysis/:caseId',
  (req, res, next) => {
    const parse = caseAnalysisParamsSchema.safeParse(req.params);
    if (!parse.success) {
      res.status(400).json({ message: 'Invalid caseId', details: parse.error.format() });
      return;
    }
    next();
  },
  getCaseAnalysis
);

export default router;
