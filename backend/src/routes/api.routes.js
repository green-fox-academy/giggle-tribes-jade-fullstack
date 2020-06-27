import express from 'express';
import bodyParser from 'body-parser';
const cors = require('cors');
import { helloController, registerController, authController } from '../controllers';
import { authUser } from '../middlewares';

const router = express.Router();

router.use(cors());
router.use(bodyParser.json());

router.get('/hello', helloController.get);

router.post('/register', registerController);

router.use(authUser);

router.post('/auth', authController);

export default router;
