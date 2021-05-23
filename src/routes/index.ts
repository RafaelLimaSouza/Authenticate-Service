import 'reflect-metadata';

import { Router } from 'express';
import healthCheckRouter from './healthCheckRouter';
import createUser from './createUser';
import authenticateRouter from './authenticateRouter';

const routes = Router();

routes.use('/healthCheck', healthCheckRouter);

routes.use('/user', createUser);

routes.use('/authenticate', authenticateRouter);

export default routes;
