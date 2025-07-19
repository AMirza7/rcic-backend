// src/routes/ads.ts

/**
 * @openapi
 * /api/ads:
 *   post:
 *     summary: Create a new advertisement
 *     tags:
 *       - Ads
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Advertisement'
 *     responses:
 *       '201':
 *         description: Advertisement created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Advertisement'
 */


import { Router, Request, Response, NextFunction, RequestHandler } from 'express';
import { ZodTypeAny } from 'zod';
import { adCreateSchema, adUpdateSchema } from '../schemas/adSchemas';
import {
  createAd,
  listAds,
  getAdById,
  updateAd,
  deleteAd
} from '../controllers/adsController';
import { requireAuth } from '../middleware/authMiddleware';

const router = Router();
router.use(requireAuth);

// now return an Express.RequestHandler
function validate(schema: ZodTypeAny): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      // send the response and then exit the handler
      res.status(400).json({
        message: 'Validation error',
        details: result.error.format()
      });
      return;
    }
    req.body = result.data; // validated & typed
    next();
  };
}

router.post('/', validate(adCreateSchema), createAd);
router.get('/', listAds);
router.get('/:id', getAdById);
router.put('/:id', validate(adUpdateSchema), updateAd);
router.delete('/:id', deleteAd);

export default router;
