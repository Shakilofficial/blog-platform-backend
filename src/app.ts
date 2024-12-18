import cors from 'cors';
import express, { Application, Request, Response } from 'express';

const app: Application = express();

// Middlewares
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());

// Routes
// app.use('/api', router);

// Health Check
app.get('/', (req: Request, res: Response) => {
  res.send('🚀 Server is Running ✅');
});

// Global error handler

// Not Found handler

export default app;
