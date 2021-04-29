import 'reflect-metadata';

import { Router } from 'express';
import healthCheckRouter from './healthCheckRouter';
import userRouter from './userRouter';
import authenticateRouter from './authenticateRouter';

const routes = Router();

routes.use('/healthCheck', healthCheckRouter);

routes.use('/user', userRouter);

routes.use('/authenticate', authenticateRouter);

export default routes;
