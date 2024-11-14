import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
const app: Application = express();

// Express default Middleware configuration--
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  }),
);

// Third-Party Application Middleware configuration--
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test Api endpoints configuration--
app.get('/api/v1/', (req: Request, res: Response) => {
  res.send({
    message: 'Welcome To Express Server',
  });
});

export default app;
