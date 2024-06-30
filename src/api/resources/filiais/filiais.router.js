import express from 'express';
import filiaisController from './filiais.controller.js';
import { localStrategy , jwtStrategy} from '../../../middleware/strategy.js';
import { sanitize } from '../../../middleware/sanitizer.js';
import { validateBody, schemas } from '../../../middleware/validator.js';

export const filiaisRouter = express.Router();
authRouter.route('/register').post(filiaisController.addFiliais);
authRouter.route('/getAllFiliais').get(sanitize(), jwtStrategy, filiaisController.getAllFiliais;
authRouter.route('/update').post(jwtStrategy, filiaisController.filiaisUpdate);
authRouter.route('/delete').post(sanitize(), jwtStrategy, filiaisController.deleteFiliais);


