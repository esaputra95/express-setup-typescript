import { Request, Response, Application } from 'express';
import express = require('express');
import dotenv from 'dotenv';
import AuthToken from './middleware';
import bodyParser = require('body-parser');
import { Login, Register } from './src/auth';

dotenv.config();
const app: Application = express();
const port = process.env.PORT;

app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: false }));

import product from './src/routers/product';

app.post('/auth/register', Register);
app.post('/auth/login', Login);

app.use('/products', AuthToken, product)

app.get('/', AuthToken, (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});