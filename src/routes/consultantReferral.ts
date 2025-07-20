import { Router } from 'express';
import { requireAuth } from '../middleware/authMiddleware';
import { getConsultantReferralAnalytics } from '../controllers/referralStatsController';

const router = Router();

// All endpoints require the consultant to be authenticated
router.use(requireAuth);

// GET analytics for the logged‑in consultant
router.get('/analytics', getConsultantReferralAnalytics);

export default router;
