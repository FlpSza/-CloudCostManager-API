import { Router } from 'express';
import { dashboardService } from '../services/dashboardService';
import { asyncHandler } from '../middleware/asyncHandler';
import { validateQuery } from '../middleware/validation';
import { z } from 'zod';

const router = Router();

const dashboardQuerySchema = z.object({
  period: z.enum(['7d', '30d', '90d', '1y']).optional().default('30d'),
  cloudProvider: z.enum(['aws', 'azure', 'gcp', 'all']).optional().default('all'),
});

// GET /api/dashboard
router.get('/', 
  validateQuery(dashboardQuerySchema),
  asyncHandler(async (req: any, res: any) => {
    const { period, cloudProvider } = req.query as z.infer<typeof dashboardQuerySchema>;
    
    const dashboardData = await dashboardService.getDashboardData({
      period,
      cloudProvider,
    });
    
    res.json(dashboardData);
  })
);

// GET /api/dashboard/metrics
router.get('/metrics',
  asyncHandler(async (_req: any, res: any) => {
    const metrics = await dashboardService.getMetrics();
    res.json(metrics);
  })
);

// GET /api/dashboard/alerts
router.get('/alerts',
  asyncHandler(async (_req: any, res: any) => {
    const alerts = await dashboardService.getActiveAlerts();
    res.json(alerts);
  })
);

// GET /api/dashboard/recommendations
router.get('/recommendations',
  asyncHandler(async (_req: any, res: any) => {
    const recommendations = await dashboardService.getRecommendations();
    res.json(recommendations);
  })
);

export { router as dashboardRouter };
