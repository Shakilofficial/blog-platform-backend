import cors from 'cors';
import express, { Application, Request, Response } from 'express';
import notFound from './middlewares/notFound';
import router from './routes';
import sendResponse from './utils/sendResponse';

const app: Application = express();

// Middlewares
app.use(cors({ origin: ['http://localhost:3000', 'http://localhost:5173'] }));
app.use(express.json());

// Routes
app.use('/api', router);

// Health Check
app.get('/', (req: Request, res: Response) => {
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: '🚀 Server is Running ✅',
    data: null,
  });
});

// Global error handler

// Not Found handler
app.use(notFound);

export default app;
