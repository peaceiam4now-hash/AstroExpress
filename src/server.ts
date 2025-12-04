import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/auth.routes';
import { errorHandler } from './middleware/errorHandler';

// Load environment variables
dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Health check
app.get('/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
  });
});

// Welcome route
app.get('/', (_req: Request, res: Response) => {
  res.json({
    name: 'AstroExpress',
    version: '1.0.0',
    description: 'Production-ready Express + TypeScript authentication boilerplate',
    endpoints: {
      health: 'GET /health',
      register: 'POST /auth/register',
      login: 'POST /auth/login',
      me: 'GET /auth/me (protected)',
    },
    documentation: 'https://github.com/peaceiam4now-hash/AstroExpress',
  });
});

// Routes
app.use('/auth', authRoutes);

// Error handler (must be last)
app.use(errorHandler);

// Start server only if not in test environment
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

export default app;
