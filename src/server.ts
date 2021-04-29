import 'reflect-metadata';

import express from 'express';
import 'express-async-errors';
import routes from './routes';
const cors = require('cors');

import './database';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  return console.log('🚀🚀 Server running!');
});
