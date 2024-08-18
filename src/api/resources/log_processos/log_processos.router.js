import express from 'express';
import log_processosController from './log_processos.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const log_processosRouter = express.Router();
log_processosRouter.route('/register').post(log_processosController.addlog_processos);
log_processosRouter.route('/getlog_processos').get(log_processosController.getlog_processos);

log_processosRouter.route('/addCTRL').post(log_processosController.addCTRL);
log_processosRouter.route('/getCTRL').get(log_processosController.getCTRL);

log_processosRouter.route('/CTRLUpdate').post(log_processosController.CTRLUpdate);
log_processosRouter.route('/deleteCTRL').get(log_processosController.deleteCTRL);

