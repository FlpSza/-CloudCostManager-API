import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import { dashboardRouter } from './routes/dashboard';
import { costAnalysisRouter } from './routes/costAnalysis';
import { automationRouter } from './routes/automation';
import { reportsRouter } from './routes/reports';
import { errorHandler } from './middleware/errorHandler';
import { logger } from './utils/logger';

const app = express();
const PORT = process.env['PORT'] || 3001;

// Middleware
app.use(helmet());
app.use(cors({
  origin: process.env['FRONTEND_URL'] || 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Request logging
app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.path}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent'),
  });
  next();
});

// Routes
app.use('/api/dashboard', dashboardRouter);
app.use('/api/cost-analysis', costAnalysisRouter);
app.use('/api/automation', automationRouter);
app.use('/api/reports', reportsRouter);

// Health check
app.get('/health', (_req, res) => {
  res.json({ 
    status: 'healthy', 
    timestamp: new Date().toISOString(),
    version: process.env['npm_package_version'] || '1.0.0'
  });
});

// Error handling
app.use(errorHandler);

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ 
    error: 'Endpoint not found',
    path: req.originalUrl 
  });
});

if (process.env['NODE_ENV'] !== 'production') {
  app.listen(PORT, () => {
    logger.info(`Server running on port ${PORT}`);
  });
}

export { app };

