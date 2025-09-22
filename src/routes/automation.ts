import { Router } from 'express';
import { automationService } from '../services/automationService';
import { asyncHandler } from '../middleware/asyncHandler';

const router = Router();

// GET /api/automation/rules
router.get('/rules',
  asyncHandler(async (req: any, res: any) => {
    const rules = await automationService.getAutomationRules();
    res.json(rules);
  })
);

// POST /api/automation/rules
router.post('/rules',
  asyncHandler(async (req: any, res: any) => {
    const rule = await automationService.createAutomationRule(req.body);
    res.json(rule);
  })
);

// GET /api/automation/executions
router.get('/executions',
  asyncHandler(async (req: any, res: any) => {
    const executions = await automationService.getExecutions();
    res.json(executions);
  })
);

export { router as automationRouter };
