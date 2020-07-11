import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { authUser } from '../middlewares';
import { helloController, userController, sessionController, authController, kingdomController } from '../controllers';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);
router.post('/sessions', sessionController.post);

router.post('/users', userController.add);

router.post('/kingdoms/:kingdomId/map', kingdomController.add);

router.use(authUser);

router.post('/auth', authController);

export default router;
