import { Router } from 'express';
import { reportsService } from '../services/reportsService';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

// GET /api/reports/monthly
router.get('/monthly',
  asyncHandler(async (req: any, res: any) => {
    const report = await reportsService.getMonthlyReport();
    res.json(report);
  })
);

// GET /api/reports/export
router.get('/export',
  asyncHandler(async (req: any, res: any) => {
    const report = await reportsService.exportReport(req.query);
    res.setHeader('Content-Type', 'application/json');
    res.setHeader('Content-Disposition', 'attachment; filename=report.json');
    res.json(report);
  })
);

export { router as reportsRouter };

