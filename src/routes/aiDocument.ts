import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { validate } from '../middleware/validate';
import { documentAnalysisSchema } from '../schemas/aiSchemas';
import { analyzeDocument, getAnalysisResults } from '../controllers/documentAnalysisController';

const router = Router();
router.use(requireAuth);

router.post('/document-analysis', validate(documentAnalysisSchema), analyzeDocument);
router.get('/document-analysis/:documentId', getAnalysisResults);

export default router;
