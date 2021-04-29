import { Router, Request, Response } from 'express';

const healthCheck = Router();

healthCheck.get('/', (request: Request, response: Response) => response.json({ status: "I'm alive" }));

export default healthCheck;
