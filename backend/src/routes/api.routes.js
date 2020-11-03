import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');

import {
  userController,
  authenticationController,
  sessionController,
  kingdomController,
  resourceController,
  buildingController,
  troopController,
  helloController,
  authenticationMiddleware,
  resourceMiddleware,
} from '../dependencies/dependencyInjection';

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
router.get('/kingdoms/:kingdomId/buildings', buildingController.get);
router.get(
  '/kingdoms/:kingdomId/buildings/:buildingId',
  buildingController.get
);
router.get('/kingdoms/:kingdomId/troops', troopController.get);
router.post('/kingdoms/:kingdomId/troops', troopController.post);
router.put('/kingdoms/:kingdomId/troops', troopController.put);

export default router;
