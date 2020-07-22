import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import {
  helloController,
  userController,
  sessionController,
  resourceController,
  authController,
} from '../controllers';
import { resourceMiddleware } from '../middlewares/resourceMiddleware';
import { authUser } from '../middlewares';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);
router.post('/users', userController.add);

router.use(authUser);
router.use('/kingdom/:kingdomID', resourceMiddleware);

router.post('/auth', authController);
router.get('/kingdom/:kingdomID/resource', resourceController.get);

export default router;
