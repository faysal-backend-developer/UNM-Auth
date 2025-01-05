import express, { NextFunction, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import rootRouter from './app/modules/routers';
import globalErrorHandler from './app/globalErrorHandler/globalErrorHandler';
import { StatusCodes } from 'http-status-codes';
// import { generatedAdminId } from './app/modules/Users/Users.utils';
// import { generatedStudentId } from './app/modules/Users/Users.utils';

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
    // res.send('Testing Server Test Request');

    // const academicSemester = {

    //   year: "2025",
    //   code : "01",
    //   title: "Autumn",
    //   startMonth: "ja",
    //   endMonth: "sep"
    // }
    // console.log(await generatedStudentId(academicSemester))
    // console.log(await generatedAdminId())
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
