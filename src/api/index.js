import express from 'express';
import { authRouter } from './resources/auth/index.js'

 
export const restRouter = express.Router();
restRouter.use('/auth', authRouter);


