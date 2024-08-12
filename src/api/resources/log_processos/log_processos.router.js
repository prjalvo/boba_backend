import express from 'express';
import log_processosController from './log_processos.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const log_processosRouter = express.Router();
log_processosRouter.route('/register').post(log_processosController.addlog_processos);
log_processosRouter.route('/getAllFiliais').get(sanitize(), jwtStrategy, log_processosController.getAllFiliais);
log_processosRouter.route('/update').post(jwtStrategy, log_processosController.filiaisUpdate);
log_processosRouter.route('/delete').post(sanitize(), jwtStrategy, log_processosController.deleteFiliais);


