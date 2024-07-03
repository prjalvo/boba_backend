import express from 'express';
import produtosController from './produtos.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const produtosRouter = express.Router();
produtosRouter.route('/register').post(jwtStrategy,produtosController.addProdutos);
produtosRouter.route('/getallprodutos').get(jwtStrategy, produtosController.getallprodutos);
produtosRouter.route('/getallprodutosid').get(jwtStrategy, produtosController.getallprodutosid);
