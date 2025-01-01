import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rootRouter from './app/modules/routers';
import globalErrorHandler from './app/globalErrorHandler/globalErrorHandler';
import { StatusCodes } from 'http-status-codes';

// Create app
const app = express();

// Express Middleware config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// third party middleware Configurations
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Root Router configuration
app.use('/api/v1/', rootRouter);

// Home Page API:
app.get('/api/v1/home', (req: Request, res: Response) => {
  res.send('Welcome to University Management Server...');
});

// Test Router for Testing Server
app.get(
  '/api/v1/test',
  async (req: Request, res: Response, next: NextFunction) => {
    res.send('Testing Server Test Request');
    // Write the Testing Function to the Response
    // console.log(await findLastUserId())

    next();
  },
);

// Global Error Handler
app.use(globalErrorHandler);

// !! Some Error Find , I can't solve this problem

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(StatusCodes.NOT_FOUND).json({
    success: false,
    message: 'This Api Endpoint is not available',
    errorMessage: [
      {
        path: req.originalUrl,
        message: 'This Api Endpoint is not available',
      },
    ],
  });
});

// Export App
export default app;
