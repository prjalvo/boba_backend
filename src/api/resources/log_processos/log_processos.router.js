import express from 'express';
import filiaisController from './filiais.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const filiaisRouter = express.Router();
filiaisRouter.route('/register').post(filiaisController.addFiliais);
filiaisRouter.route('/getAllFiliais').get(sanitize(), jwtStrategy, filiaisController.getAllFiliais);
filiaisRouter.route('/update').post(jwtStrategy, filiaisController.filiaisUpdate);
filiaisRouter.route('/delete').post(sanitize(), jwtStrategy, filiaisController.deleteFiliais);


