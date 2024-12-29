import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rootRouter from './app/modules/routers';
import globalErrorHandler from './app/globalErrorHandler/globalErrorHandler';
// import { findLastUserId } from './app/modules/Users/Users.utils';

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

// Export App
export default app;
