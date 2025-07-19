// src/schemas/adSchemas.ts
import { z } from 'zod';

export const imageSchema = z.object({
  id: z.string().uuid(),
  url: z.string().url(),
  alt: z.string(),
  isPrimary: z.boolean(),
});

export const targetAudienceSchema = z.object({
  countries: z.array(z.string()),
  languages: z.array(z.string()),
  services: z.array(z.string()),
  demographics: z
    .object({
      ageRange: z.tuple([z.number(), z.number()]).optional(),
      interests: z.array(z.string()).optional(),
    })
    .optional(),
});

export const placementSchema = z.object({
  locations: z.array(
    z.enum(['homepage', 'sidebar', 'search', 'template', 'ai_chat'])
  ),
  priority: z.enum(['low', 'medium', 'high', 'premium']),
  displayRules: z
    .object({
      maxDailyViews: z.number().int().min(0).optional(),
      maxClicksPerUser: z.number().int().min(0).optional(),
      minimumViewDuration: z.number().min(0).optional(),
    })
    .optional(),
});

export const pricingSchema = z.object({
  model: z.enum(['cpm', 'cpc', 'flat_rate']),
  rate: z.number().positive(),
  currency: z.enum(['CAD', 'USD']),
  totalBudget: z.number().positive().optional(),
  dailyBudget: z.number().positive().optional(),
});

export const analyticsSchema = z.object({
  impressions: z.number().int().min(0),
  clicks: z.number().int().min(0),
  ctr: z.number().min(0),
  conversions: z.number().int().min(0),
  revenue: z.number().min(0),
  lastUpdated: z.preprocess((val) => new Date(val as string), z.date()),
});

export const variantSchema = z.object({
  id: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  images: z.array(imageSchema).min(1),
  weight: z.number().min(0),
  performance: analyticsSchema,
});

export const adCreateSchema = z.object({
  advertiserId: z.string().uuid(),
  title: z.string(),
  description: z.string(),
  content: z.string(),
  images: z.array(imageSchema).min(1),
  logo: z.string().url().optional(),
  businessName: z.string(),
  contactEmail: z.string().email(),
  contactPhone: z.string(),
  website: z.string().url().optional(),
  targetAudience: targetAudienceSchema,
  placement: placementSchema,
  startDate: z.preprocess((val) => new Date(val as string), z.date()),
  endDate: z.preprocess((val) => new Date(val as string), z.date()),
  timezone: z.string(),
  isActive: z.boolean(),
  tier: z.enum(['basic', 'premium', 'enterprise']),
  pricing: pricingSchema,
  analytics: analyticsSchema,
  status: z.enum([
    'draft',
    'pending_review',
    'approved',
    'rejected',
    'paused',
    'expired',
  ]),
  reviewNotes: z.string().optional(),
  reviewedBy: z.string().uuid().optional(),
  reviewedAt: z.preprocess((val) => new Date(val as string), z.date()).optional(),
  variants: z.array(variantSchema).optional(),
  metadata: z.record(z.string(), z.any()).optional(),
});

// If you want a separate schema for updates (allowing partials):
export const adUpdateSchema = adCreateSchema.partial();
