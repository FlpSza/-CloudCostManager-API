import { Router } from 'express';
import { costAnalysisService } from '../services/costAnalysisService';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateQuery } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

const costAnalysisQuerySchema = z.object({
  period: z.enum(['7d', '30d', '90d', '1y']).optional().default('30d'),
  service: z.string().optional(),
  region: z.string().optional(),
});

// GET /api/cost-analysis/trends
router.get('/trends',
  validateQuery(costAnalysisQuerySchema),
  asyncHandler(async (req: any, res: any) => {
    const trends = await costAnalysisService.getCostTrends(req.query as z.infer<typeof costAnalysisQuerySchema>);
    res.json(trends);
  })
);

// GET /api/cost-analysis/breakdown
router.get('/breakdown',
  validateQuery(costAnalysisQuerySchema),
  asyncHandler(async (req: any, res: any) => {
    const breakdown = await costAnalysisService.getCostBreakdown(req.query as z.infer<typeof costAnalysisQuerySchema>);
    res.json(breakdown);
  })
);

// GET /api/cost-analysis/comparison
router.get('/comparison',
  asyncHandler(async (req: any, res: any) => {
    const comparison = await costAnalysisService.getCostComparison();
    res.json(comparison);
  })
);

export { router as costAnalysisRouter };

