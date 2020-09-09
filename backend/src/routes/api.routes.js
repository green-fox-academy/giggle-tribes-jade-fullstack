import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import {
  helloController,
  UserController,
  sessionController,
  resourceController,
  authController,
  troopsController,
  kingdomController,
  buildingsController,
} from '../controllers';
import {
  BuildingService,
  KingdomService,
  ResourceService,
  SessionService,
  TroopService,
  UserService
} from '../services';
import {
  BuildingRepo,
  errorCodes,
  KingdomRepo,
  LocationRepo,
  ResourceRepo,
  TroopRepo,
  UserRepo
} from '../repos';
import { db } from '../data/connection';
import { resourceMiddleware } from '../middlewares/resourceMiddleware';
import { authUser } from '../middlewares';

const userController = new UserController({UserService,UserRepo,KingdomRepo,ResourceRepo,db,errorCodes});

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);
router.post('/users', userController.post);

router.post('/kingdoms/:kingdomId/map', kingdomController.post);
router.get('/kingdoms/:kingdomId/map', kingdomController.getById);
router.get('/kingdoms/map', kingdomController.get);

router.use(authUser);
router.post('/auth', authController);
router.use('/kingdoms/:kingdomId', resourceMiddleware);

router.get('/kingdoms/:kingdomID/resource', resourceController.get);
router.get('/kingdoms/:kingdomID/troops', troopsController.get);
router.post('/kingdoms/:kingdomID/troops', troopsController.post);
router.post('/kingdoms/:kingdomId/buildings', buildingsController.post);

export default router;
