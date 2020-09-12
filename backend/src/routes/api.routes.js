import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import {
  AuthenticationMiddleware,
  ResourceMiddleware
} from '../middlewares';
import {
  helloController,
  UserController,
  SessionController,
  ResourceController,
  AuthenticationController,
  troopsController,
  KingdomController,
  BuildingController,
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

const authenticationMiddleware = new AuthenticationMiddleware({SessionService,UserRepo,db,errorCodes});
const resourceMiddleware = new ResourceMiddleware({ResourceService,ResourceRepo,db,errorCodes});

const authenticationController = new AuthenticationController();
const userController = new UserController({UserService,UserRepo,KingdomRepo,ResourceRepo,db,errorCodes});
const sessionController = new SessionController({SessionService,UserRepo,db,errorCodes});
const kingdomController = new KingdomController({KingdomService,KingdomRepo,ResourceRepo,BuildingRepo,LocationRepo,db,errorCodes});
const resourceController = new ResourceController({ResourceService,ResourceRepo,db,errorCodes});
const buildingController = new BuildingController({BuildingService,ResourceService,ResourceRepo,BuildingRepo,db,errorCodes});

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
router.use('/kingdoms/:kingdomId', resourceMiddleware.post);

router.get('/kingdoms/:kingdomId/resource', resourceController.get);
router.post('/kingdoms/:kingdomId/buildings', buildingController.post);
/*router.get('/kingdoms/:kingdomID/troops', troopsController.get);
router.post('/kingdoms/:kingdomID/troops', troopsController.post);
*/

export default router;
