import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import {
  helloController,
  userController,
  sessionController,
  resourceController,
  authController,
  kingdomController,
  buildingsController
} from '../controllers';
import { resourceMiddleware } from '../middlewares/resourceMiddleware';
import { authUser } from '../middlewares';


const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);
router.post('/users', userController.post);

router.post('/kingdoms/:kingdomId/map', kingdomController.post);
router.get('/kingdoms/map', kingdomController.get);

router.use(authUser);
router.post('/auth', authController);
//router.use('/kingdoms/:kingdomID', resourceMiddleware);

router.get('/kingdoms/:kingdomID/resource', resourceController.get);

router.post('/kingdoms/:kingdomID/buildings', buildingsController.post);


export default router;
