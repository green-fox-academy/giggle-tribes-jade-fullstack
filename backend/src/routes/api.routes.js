import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import {
  AuthenticationMiddleware
} from '../middlewares';
import {
  helloController,
  UserController,
  SessionController,
  resourceController,
  AuthenticationController,
  troopsController,
  KingdomController,
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

const authenticationMiddleware = new AuthenticationMiddleware({SessionService,UserRepo,db,errorCodes});
const authenticationController = new AuthenticationController();
const userController = new UserController({UserService,UserRepo,KingdomRepo,ResourceRepo,db,errorCodes});
const sessionController = new SessionController({SessionService,UserRepo,db,errorCodes});
const kingdomController = new KingdomController({KingdomService,KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes});

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);
router.post('/users', userController.post);

router.post('/kingdoms/:kingdomId/map', kingdomController.post);
router.get('/kingdoms/:kingdomId/map', kingdomController.getById);
router.get('/kingdoms/map', kingdomController.get);

router.use(authenticationMiddleware.validate);
router.post('/auth', authenticationController.post);
router.use('/kingdoms/:kingdomId', resourceMiddleware);

router.get('/kingdoms/:kingdomID/resource', resourceController.get);
router.get('/kingdoms/:kingdomID/troops', troopsController.get);
router.post('/kingdoms/:kingdomID/troops', troopsController.post);
router.post('/kingdoms/:kingdomId/buildings', buildingsController.post);

export default router;
