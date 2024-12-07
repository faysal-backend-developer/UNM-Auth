import express, { Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';

// Create app
const app = express();

// Express Middleware config
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// third party middleware Configurations
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// test Api Create :
app.get('/api/v1/home', (req: Request, res: Response) => {
  res.send('Welcome to University Management Server...');
});

// Export App
export default app;
