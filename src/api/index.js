import express from 'express';
import { authRouter } from './resources/auth/index.js'
import { filiaisRouter } from './resources/filiais/index.js'
import { produtosRouter } from './resources/produtos/index.js'
 
export const restRouter = express.Router();
restRouter.use('/auth', authRouter);
restRouter.use('/filiais', filiaisRouter);
restRouter.use('/produtos', produtosRouter);


