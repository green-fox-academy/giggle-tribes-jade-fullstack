import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import {
  helloController,
  userController,
  sessionController,
  resourceController,
  authController,
  troopsController,
  kingdomController,
} from '../controllers';
import { resourceMiddleware } from '../middlewares/resourceMiddleware';
import { authUser } from '../middlewares';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);
router.post('/users', userController.add);

router.post('/kingdoms/:kingdomId/map', kingdomController.add);
router.get('/kingdoms/map', kingdomController.get);

router.use(authUser);
router.post('/auth', authController);
router.use('/kingdoms/:kingdomID', resourceMiddleware);

router.get('/kingdoms/:kingdomID/resource', resourceController.get);
router.post('/kingdoms/:kingdomID/troops', troopsController.post);

export default router;
